// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const data = [
                    'मंगलयान, भारत का प्रथम मंगल अभियान है',
    		        ' यह भारत की प्रथम ग्रहों के बीच का मिशन है',
                    'मंगलयान का मुख्य उद्देश्य भारत के रॉकेट प्रक्षेपण प्रणाली, अंतरिक्ष यान के निर्माण और संचालन क्षमताओं का प्रदर्शन करने के लिए हैं',
                    'विशेष रूप से, मिशन का प्राथमिक उद्देश्य ग्रहों के बीच के लिए मिशन के संचालन,उपग्रह डिजाइन, योजना और प्रबंधन के लिए आवश्यक तकनीक का विकास करना है।', 
                    'द्वितीयक उद्देश्य मंगल ग्रह की सतह का स्वदेशी वैज्ञानिक उपकरणों का उपयोग कर विशेषताओं का पता लगाना है।',
                    'इस मिशन की लागत 450 करोड़ रुपये यह नासा के पहले मंगल मिशन का दसवां और चीन-जापान के नाकाम मंगल अभियानों का एक चौथाई भर है।',
                    'भारत भी अब उन देशों में शामिल हो गया है जिन्होंने मंगल पर अपने यान भेजे हैं। तक ले जाता है. ' ,
                    ' भारत एशिया का भी ऐसा करने वाला प्रथम पहला देश बन गया। क्योंकि इससे पहले चीन और जापान अपने मंगल अभियान में असफल रहे थे।ें मदद करता है. ',
                    
];

const GET_FACT_MESSAGE = "यह रहा आपका fact : ";

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'नमस्ते, मंगलयान facts में आपका स्वागत है, आप मुझे मंगलयान के फैक्ट पूछ सकते है';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const GetNewFactIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetNewFactIntent';
    },
    handle(handlerInput) {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;


        const speechText = speechOutput;
        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = ' आप मुझे नया fact सुनाओ बोल सकते हैं या फिर exit भी बोल सकते हैं... आप क्या करना चाहेंगे? ' ;
        const reprompt = 'मैं आपकी किस प्रकार से सहायता कर सकती हूँ? ';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'धन्यवाद, फिर मिलते हैं';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
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
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
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
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = ` सॉरी, मैं वो समज नहीं पायी. क्या आप repeat कर सकते हैं? `;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GetNewFactIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();