// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require("ask-sdk-core");
const actorsData = require("./actor-data.json");

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const speakOutput =
      `<audio src="soundbank://soundlibrary/musical/amzn_sfx_drum_comedy_01"/> Hello, Welcome to Just for Fun. I can tell you about what personality do you match, for that, I would need some inputs from you. You can start by saying your favourite color or what book you like or what country do you live in?`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};
const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "HelloWorldIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput =
      "Hello, I can tell you about what personality do you match, for that I would need some inputs from you. You can start by saying your favourite color or what book you like or what country do you live in?";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const calculations = (age, gender, book, color, country) => {
  // MAKE ANY CALCULATIONS AND EXTRACT ANY NAME FROM THE LIST. HERE I AM RANDOMLY TAKING OUT A NAME USING THE RANDOM FUNCION.
  const randomIdx = Math.floor(Math.random() * 97);
  return actorsData[randomIdx].name;
};

const CharacterDescriptionIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "CharacterDescriptionIntent"
    );
  },
  handle(handlerInput) {
    const { requestEnvelope, responseBuilder } = handlerInput;
    const { intent } = requestEnvelope.request;
    let speakOutput = `Oops, I did not get it right.`;

    if (intent.confirmationStatus === "CONFIRMED") {
      const age = Alexa.getSlotValue(requestEnvelope, "age");
      const gender = Alexa.getSlotValue(requestEnvelope, "gender");
      const book = Alexa.getSlotValue(requestEnvelope, "book");
      const color = Alexa.getSlotValue(requestEnvelope, "color");
      const country = Alexa.getSlotValue(requestEnvelope, "country");

      const suggestedActorName = calculations(
        age,
        gender,
        book,
        color,
        country
      );

      speakOutput =  `<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_bridge_02"/>I processed your inputs and <break><say-as interpret-as="interjection">bravo</say-as></break>, you resemble a lot with ${suggestedActorName}.<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_outro_01"/>`
      
    } else {
      const repromptText = `Hey! I can tell you about what personality do you resemble, for that I would need some inputs from you. You can start by saying your favourite color or what book you like, or what country do you live in.`;
      responseBuilder.reprompt(repromptText);
    }

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput = `I can tell you about what personality do you resemble, for that I would need some inputs from you. You can start by saying your favourite color or what book you like, or what country do you live in.`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};
const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speakOutput = "Goodbye!";
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      "SessionEndedRequest"
    );
  },
  handle(handlerInput) {
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse();
  },
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
    );
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
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
  },
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    CharacterDescriptionIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();