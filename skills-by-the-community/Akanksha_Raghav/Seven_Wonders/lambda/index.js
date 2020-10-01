// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello Welcome to the seven wonders.  you can know about 7 wonders of the world. How can I help you?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const IntroIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IntroIntent';
    },
    handle(handlerInput) {
         const data = require('./data/intro.json');
        const template = require('./templates/intro.json');
        const speakOutput = 'we have seven wonders in the world. It was a campaign started in 2000 to choose Wonders of the World from a selection of 200 existing monuments. The popularity poll was led by Canadian-Swiss Bernard Weber and organized by the New7Wonders Foundation based in Zurich, Switzerland, with winners announced on 7 July 2007 in Lisbon.';
       if (supportsAPL(handlerInput)) {
             handlerInput.responseBuilder
             .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document: template,
                datasources: data
            })
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard('Wonders Of the World', speakOutput)
            .getResponse();
    }
};

const TajMahalIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TajMahalIntent';
    },
    handle(handlerInput) {
         const data = require('./data/TajMahal.json');
        const template = require('./templates/TajMahal.json');
        const speakOutput = 'The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra. In 2007, it was declared a winner of the New7Wonders of the World (2000–2007) initiative.';
       if (supportsAPL(handlerInput)) {
             handlerInput.responseBuilder
             .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document: template,
                datasources: data
            })
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard('TAJ MAHAL', speakOutput)
            .getResponse();
    }
};

const ColosseumIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ColosseumIntent';
    },
    handle(handlerInput) {
         const data = require('./data/Colosseum.json');
        const template = require('./templates/Colosseum.json');
        const speakOutput = 'The Colosseum or Coliseum, also known as the Flavian Amphitheatre, is an oval amphitheatre in the centre of the city of Rome, Italy. Built of concrete and sand, it is the largest amphitheatre ever built. The Colosseum is situated just east of the Roman Forum.';
       if (supportsAPL(handlerInput)) {
             handlerInput.responseBuilder
             .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document: template,
                datasources: data
            })
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard('COLOSSEUM', speakOutput)
            .getResponse();
    }
};

const PetraIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PetraIntent';
    },
    handle(handlerInput) {
         const data = require('./data/Petra.json');
        const template = require('./templates/Petra.json');
        const speakOutput = 'Petra, originally known to the Nabataeans as Raqmu, is a historical and archaeological city in southern Jordan. The city is famous for its rock-cut architecture and water conduit system. Another name for Petra is the Rose City due to the color of the stone out of which it is carved.';
       if (supportsAPL(handlerInput)) {
             handlerInput.responseBuilder
             .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document: template,
                datasources: data
            })
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard('PETRA', speakOutput)
            .getResponse();
    }
};

const MachuPicchuIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MachuPicchuIntent';
    },
    handle(handlerInput) {
         const data = require('./data/MachuPicchu.json');
        const template = require('./templates/MachuPicchu.json');
        const speakOutput = 'Machu Picchu, is a 15th-century Inca citadel situated on a mountain ridge 2,430 metres (7,970 ft) above sea level. It is located in the Cusco Region, Urubamba Province, Machupicchu District in Peru, above the Sacred Valley, which is 80 kilometres (50 mi) northwest of Cuzco and through which the Urubamba River flows.';
       if (supportsAPL(handlerInput)) {
             handlerInput.responseBuilder
             .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document: template,
                datasources: data
            })
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard('MACHU PICCHU', speakOutput)
            .getResponse();
    }
};
const ChristtheRedeemerIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChristtheRedeemerIntent';
    },
    handle(handlerInput) {
         const data = require('./data/ChristtheRedeemer.json');
        const template = require('./templates/ChristtheRedeemer.json');
        const speakOutput = 'Christ the Redeemer, is an Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil, created by Polish-French sculptor Paul Landowski and built by the Brazilian engineer Heitor da Silva Costa, in collaboration with the French engineer Albert Caquot. ';
       if (supportsAPL(handlerInput)) {
             handlerInput.responseBuilder
             .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document: template,
                datasources: data
            })
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard('Christ the Redeemer', speakOutput)
            .getResponse();
    }
};

const ElCastilloIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ElCastilloIntent';
    },
    handle(handlerInput) {
         const data = require('./data/ElCastillo.json');
        const template = require('./templates/ElCastillo.json');
        const speakOutput = 'El Castillo,  also known as the Temple of Kukulcan, is a Mesoamerican step-pyramid that dominates the center of the Chichen Itza archaeological site in the Mexican state of Yucatán. ';
       if (supportsAPL(handlerInput)) {
             handlerInput.responseBuilder
             .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document: template,
                datasources: data
            })
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard('El Castillo', speakOutput)
            .getResponse();
    }
};

const GreatWallofChinaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GreatWallofChinaIntent';
    },
    handle(handlerInput) {
        const data = require('./data/GreatWallofChina.json');
        const template = require('./templates/GreatWallofChina.json');
        const speakOutput = 'The Great Wall of China is a series of fortifications made of stone, brick, tamped earth, wood, and other materials, generally built along an east-to-west line across the historical northern borders of China to protect the Chinese states and empires against the raids and invasions of the various nomadic groups of the Eurasian Steppe.';
       if (supportsAPL(handlerInput)) {
             handlerInput.responseBuilder
             .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document: template,
                datasources: data
            })
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard('The Great Wall of China', speakOutput)
            .getResponse();
    }
};



const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Here you will get to know about the seven wonders of the world. You can say the name of any of the 7 wonders of the world. For example you can say, great wall of china';

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

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
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

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
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



function supportsAPL(handlerInput) {
    const supportedInterfaces =
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces;
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface !== null && aplInterface !== undefined;
}
// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        IntroIntentHandler,
        TajMahalIntentHandler,
        ColosseumIntentHandler,
        PetraIntentHandler,
        MachuPicchuIntentHandler,
        ChristtheRedeemerIntentHandler,
        ElCastilloIntentHandler,
        GreatWallofChinaIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
