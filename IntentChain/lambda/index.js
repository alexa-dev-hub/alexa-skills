const Alexa = require('ask-sdk-core');
const persistenceAdapter = require("ask-sdk-s3-persistence-adapter");

/////////////////////////////////
// Helper Function
/////////////////////////////////
const calculateRisk = ({ feverSymptom, coldSymptom, travelHistory }) => {
    let frisk = 0;
    let crisk = 0;
    let trisk = 0;
    switch (feverSymptom) {
      case "high fever":
        frisk = 99;
        break;
      case "moderate fever":
        frisk = 66;
        break;
      case "no fever":
        frisk = 33;
        break;
    }
    switch (coldSymptom) {
      case "severe cold":
        crisk = 99;
        break;
      case "mild cold":
        frisk = 66;
        break;
      case "no cold":
        frisk = 33;
        break;
    }
    switch (travelHistory) {
      case "yes":
        trisk = 80;
        break;
      case "no":
        trisk = 10;
        break;
    }
    const risk = (frisk + crisk + trisk) / 3;
    console.log("RISK ====> ", risk);
    if (0 < risk && risk <= 33) return "low";
    if (33 < risk && risk <= 66) return "moderate";
    if (66 < risk && risk <= 100) return "high";
  };


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = `Hello! How are you?`
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const WhatCanYouDoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WhatCanYouDoIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'I can start a generic Covid test, let us begin.';
        return handlerInput.responseBuilder
            .addDelegateDirective({
                name: "FeverCheckIntent",
            })
            .speak(speakOutput)
            .getResponse();
    }
};


const FeverCheckIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FeverCheckIntent';
    },
    async handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const feverSymptom =  Alexa.getSlotValue(requestEnvelope, "FeveReport");
        
        console.log("FEVER SYMPTOM RECORDED ====> ", feverSymptom)
        const symptoms = { feverSymptom };
        
        attributesManager.setPersistentAttributes(symptoms);
        await attributesManager.savePersistentAttributes();

        const speakOutput = `Okay, so now I've got that you have ${feverSymptom}.`;
        return handlerInput.responseBuilder
            .addDelegateDirective({
                name: "ColdCheckIntent",
            })
            .speak(speakOutput)
            .getResponse();
    }
};


const ColdCheckIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ColdCheckIntent';
    },
    async handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const coldSymptom = Alexa.getSlotValue(requestEnvelope, "ColdReport");
        
        let symptoms = await attributesManager.getPersistentAttributes()
        symptoms.coldSymptom = coldSymptom;

        console.log("Cold SYMPTOM RECORDED ====> ", symptoms.coldSymptom, symptoms.feverSymptom)

        attributesManager.setPersistentAttributes(symptoms);
        await attributesManager.savePersistentAttributes();

        const speakOutput = `Okay, I've got that you have ${coldSymptom}.`;
        
        return handlerInput.responseBuilder
            .addDelegateDirective({
                name: "TravelCheckIntent",
            })
            .speak(speakOutput)
            .getResponse();
    }
};

const TravelCheckIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TravelCheckIntent';
    },
    async handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;
        const travelHistory = Alexa.getSlotValue(requestEnvelope, "TravelReport");
        
        let symptoms = await attributesManager.getPersistentAttributes()
        symptoms.travelHistory = travelHistory;

        console.log("travel RECORDED ====> ", symptoms.coldSymptom, symptoms.feverSymptom, symptoms.travelHistory)

        attributesManager.setPersistentAttributes(symptoms);
        await attributesManager.savePersistentAttributes();

        const speakOutput = `Okay, so have ${travelHistory} travel history. As far as I can see you have a ${calculateRisk(symptoms)} risk of getting Coronavirus. Stay Safe!`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .withPersistenceAdapter(
        new persistenceAdapter.S3PersistenceAdapter({
        bucketName: process.env.S3_PERSISTENCE_BUCKET,
        })
    )
    .addRequestHandlers(
        LaunchRequestHandler,
        WhatCanYouDoIntentHandler,
        FeverCheckIntentHandler,
        ColdCheckIntentHandler,
        TravelCheckIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
