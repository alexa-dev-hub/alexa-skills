const Alexa = require('ask-sdk-core');
const i18n = require('i18next');


const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    console.log("Launch Request Handler Called");

    let speechText =
      "Hello, I will tell you a quote to fill motivation in you.I will read out quotes from  famous personalities like Warren Buffett,Steve Jobs,Abdul Kalam  or simply say tell me a quote.";
    let repromptText =
      "I did not receive any input. You can say, tell me a random quote.";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(repromptText)
      .getResponse();
  }
};

// core functionality for fact skill
const GetNewQuoteHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    // checks request type
    return (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewQuoteIntent');
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    // gets a random fact by assigning an array to the variable
    // the random item from the array will be selected by the i18next library
    // the i18next library is set up in the Request Interceptor
    const randomQuote = requestAttributes.t('QUOTES');
    // concatenates a standard message with the random fact
    const speakOutput = requestAttributes.t('GET_QUOTE_MESSAGE') + randomQuote;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      // Uncomment the next line if you want to keep the session open so you can
      // ask for another fact without first re-opening the skill
      // .reprompt(requestAttributes.t('HELP_REPROMPT'))
      .withSimpleCard(randomQuote)
      .getResponse();
  },
};
const HelpHandler = {
  canHandle(handlerInput) {
  const request = handlerInput.requestEnvelope.request;
  return (request.type === 'IntentRequest'
                      && request.intent.name === 'AMAZON.HelpIntent');  
},
  handle(handlerInput) {
    console.log("Help Request Handler Called");

    return handlerInput.responseBuilder
      .speak("How can I help you?")
      .reprompt('You can say tell me a quote, or, you can say exit... What can I help you with?')
      .getResponse();
  }
};



const FallbackHandler = {
  // The FallbackIntent can only be sent in those locales which support it,
  // so this handler will always be skipped in locales where it is not supported.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak('The Get quote skill can\'t help you with that.  It can help you discover quotes  if you say tell me a quote. What can I help you with?')
      .reprompt('What can I help you with?')
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak("Good Bye! Have a nice day")
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak('an error occurred.')
      .getResponse();
  },
};

const LocalizationInterceptor = {
  process(handlerInput) {
    // Gets the locale from the request and initializes i18next.
    const localizationClient = i18n.init({
      lng: handlerInput.requestEnvelope.request.locale,
      resources: languageStrings,
      returnObjects: true
    });
    // Creates a localize function to support arguments.
    localizationClient.localize = function localize() {
    
      const args = arguments;
      const value = i18n.t(...args);
      // If an array is used then a random value is selected
      if (Array.isArray(value)) {
        return value[Math.floor(Math.random() * value.length)];
      }
      return value;
    };

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function translate(...args) {
      return localizationClient.localize(...args);
    }
  }
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    GetNewQuoteHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler,
  )
  .addRequestInterceptors(LocalizationInterceptor)
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('sample/basic-fact/v2')
  .lambda();

// TODO: Replace this data with your own.
// It is organized by language/locale.  You can safely ignore the locales you aren't using.
// Update the name and messages to align with the theme of your skill



const enData = {
  translation: {

    GET_QUOTE_MESSAGE: 'Here is your quote from a famous personality:',
    HELP_MESSAGE: 'You can say tell me a quote, or, you can say exit... What can I help you with?',
    HELP_REPROMPT: 'What can I help you with?',
    FALLBACK_MESSAGE: 'The Get quote skill can\'t help you with that.  It can help you discover quotes  if you say tell me a quote. What can I help you with?',
    FALLBACK_REPROMPT: 'What can I help you with?',
    ERROR_MESSAGE: 'an error occurred.',
    STOP_MESSAGE: 'Goodbye!',
    QUOTES:
      [

      "We simply attempt to be fearful when others are greedy and to be greedy only when others are fearful..",
     "Price is what you pay. Value is what you get.",
     "Someone's sitting in the shade today because someone planted a tree a long time ago.",
     "Happiness is when what you think, what you say, and what you do are in harmony.",
     "When I despair, I remember that all through history the way of truth and love have always won. There have been tyrants and murderers, and for a time, they can seem invincible, but in the end, they always fall. Think of it--always.",
     "The weak can never forgive. Forgiveness is the attribute of the strong.",
     "Where there is love there is life.",
     "Risk comes from not knowing what you're doing.",
     "Prayer is not asking. It is a longing of the soul. It is daily admission of one's weakness. It is better in prayer to have a heart without words than words without a heart.",
     "Freedom is not worth having if it does not include the freedom to make mistakes.",
     "Nobody can hurt me without my permission.",
     "God has no religion.",
     "Hate the sin, love the sinner.",
     "I will not let anyone walk through my mind with their dirty feet.",
     "You must not lose faith in humanity. Humanity is like an ocean; if a few drops of the ocean are dirty, the ocean does not become dirty.",
     "Chains of habit are too light to be felt until they are too heavy to be broken.",
     "The future depends on what you do today,",
     "A man is but the product of his thoughts. What he thinks, he becomes.",
     "To give pleasure to a single heart by a single act is better than a thousand heads bowing in prayer.",
     "The greatness of a nation and its moral progress can be judged by the way its animals are treated.",
     "Each night, when I go to sleep, I die. And the next morning, when I wake up, I am reborn.",
     "It is unwise to be too sure of one's own wisdom. It is healthy to be reminded that the strongest might weaken and the wisest might err.",
     "Whatever you do will be insignificant, but it is very important that you do it.",
     "To believe in something, and not to live it, is dishonest.",
     "Whatever you do will be insignificant, but it is very important that you do it.",
     "It's better to be a pirate than to join the Navy.",
     "I'm as proud of what we don't do as I am of what we do.",
     "It's rare that you see an artist in his 30s or 40s able to really contribute something amazing.",
     "Design is not just what it looks like and feels like. Design is how it works.",
     "There are people in the world so hungry, that God cannot appear to them except in the form of bread.",
      "Invention is by its very nature disruptive. If you want to be understood at all times, then don't do anything new.",
    "We are stubborn on vision. We are flexible on details",
    "We see our customers as invited guests to a party, and we are the hosts. It’s our job every day to make every important aspect of the customer experience a little bit better.",
    "The great thing about fact-based decisions is that they overrule the hierarchy.",
    "People who are right most of the time are people who change their minds often.",
    "Work Hard, have fun, make history",
    "We can't be in survival mode. We have to be in growth mode.",
    "Your margin is my opportunity",
    "If you never want to be criticized, for goodness' sake don't do anything new.",
     "Imagination is more important than knowledge.",
    "If the facts don't fit the theory, change the facts.",
    "Life is like riding a bicycle. To keep your balance you must keep moving.",
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    "There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.",
    "I am enough of an artist to draw freely upon my imagination. Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
    "If you can't explain it to a six year old, you don't understand it yourself.",
    "If you want your children to be intelligent, read them fairy tales. If you want them to be more intelligent, read them more fairy tales.",
    "Logic will get you from A to Z; imagination will get you everywhere.",
    "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    "Anyone who has never made a mistake has never tried anything new.",
    "I speak to everyone in the same way, whether he is the garbage man or the president of the university.",
    "Never memorize something that you can look up.",
    "When you are courting a nice girl an hour seems like a second. When you sit on a red-hot cinder a second seems like an hour. That's relativity.",
    "A clever person solves a problem. A wise person avoids it.",
    "Science without religion is lame, religion without science is blind.",
     "My Best Friend is a person who will give me a book I have not read.",
    "Nearly all men can stand adversity, but if you want to test a man's character, give him power.",
    "My concern is not whether God is on our side; my greatest concern is to be on God's side, for God is always right.",
    "I'm a success today because I had a friend who believed in me and I didn't have the heart to let him down.",
    "Books serve to show a man that those original thoughts of his aren't very new after all.",
    "When I do good, I feel good. When I do bad, I feel bad. That's my religion.",
    "Those who deny freedom to others, deserve it not for themselves",
    "Whenever I hear anyone arguing for slavery, I feel a strong impulse to see it tried on him personally.",
    "I am a slow walker, but I never walk back.",
    "There are no bad pictures; that's just how your face looks sometimes.",
    "Those who look for the bad in people will surely find it.",
    "I can see how it might be possible for a man to look down upon the earth and be an atheist, but I cannot conceive how a man could look up into the heavens and say there is no God.",
    "I don't like that man. I must get to know him better.",
    "When you reach the end of your rope, tie a knot and hang on.",
    "The bird is powered by its own life and by its motivation.",
    "Don’t take rest after your first victory because if you fail in second, more lips are waiting to say that your first victory was just luck.",
    "To succeed in your mission, you must have single-minded devotion to your goal.",
    "If you fail, never give up because FAIL means First Attempt In Learning ",
    "Failure will never overtake me if my determination to succeed is strong enough.",
    "All of us do not have equal talent. But , all of us have an equal opportunity to develop our talents.",
    "Your most unhappy customers are your greatest source of learning.",
    "It's fine to celebrate success but it is more important to heed the lessons of failure.",
    "Life is not fair; get used to it.",
    "If you want to achieve greatness stop asking for permission.",
    "Things work out best for those who make the best of how things work out.",
    "To live a creative life, we must lose our fear of being wrong.",
    "If you are not willing to risk the usual you will have to settle for the ordinary.",
    "Trust because you are willing to accept the risk, not because it's safe or certain.",
    "Take up one idea. Make that one idea your life--think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success.",
    "All our dreams can come true if we have the courage to pursue them.",
    "Good things come to people who wait, but better things come to those who go out and get them.",
    "If you do what you always did, you will get what you always got.",
    "Success is walking from failure to failure with no loss of enthusiasm.",
    "Just when the caterpillar thought the world was ending, he turned into a butterfly.",
    "Successful entrepreneurs are givers and not takers of positive energy.",
    "Whenever you see a successful person you only see the public glories, never the private sacrifices to reach them.",
    "Opportunities don't happen, you create them.",
    "Try not to become a person of success, but rather try to become a person of value.",
    "Great minds discuss ideas; average minds discuss events; small minds discuss people.",
    "I have not failed. I've just found 10,000 ways that won't work.",
    "If you don't value your time, neither will others. Stop giving away your time and talents--start charging for it.",
    "A successful man is one who can lay a firm foundation with the bricks others have thrown at him.",
    "No one can make you feel inferior without your consent.",
    "The whole secret of a successful life is to find out what is one's destiny to do, and then do it.",
    "If you're going through hell keep going.",
    "The ones who are crazy enough to think they can change the world, are the ones who do.",
    "Don't raise your voice, improve your argument.",
    "What seems to us as bitter trials are often blessings in disguise.",
    "The meaning of life is to find your gift. The purpose of life is to give it away.",
    "The distance between insanity and genius is measured only by success.",
    "When you stop chasing the wrong things, you give the right things a chance to catch you.",
    "I believe that the only courage anybody ever needs is the courage to follow your own dreams.",
    "No masterpiece was ever created by a lazy artist.",
    "Happiness is a butterfly, which when pursued, is always beyond your grasp, but which, if you will sit down quietly, may alight upon you.",
    "If you can't explain it simply, you don't understand it well enough.",
    "Blessed are those who can give without remembering and take without forgetting.",
    "Do one thing every day that scares you.",
    "What's the point of being alive if you don't at least try to do something remarkable.",
    "Life is not about finding yourself. Life is about creating yourself.",
    "Nothing in the world is more common than unsuccessful people with talent.",
    "Knowledge is being aware of what you can do. Wisdom is knowing when not to do it.",
    "Your problem isn't the problem. Your reaction is the problem.",
    "Innovation distinguishes between a leader and a follower.",
    "There are two types of people who will tell you that you cannot make a difference in this world: those who are afraid to try and those who are afraid you will succeed.",
    "Thinking should become your capital asset, no matter whatever ups and downs you come across in your life.",
    "I find that the harder I work, the more luck I seem to have.",
    "The starting point of all achievement is desire.",
    "Success is the sum of small efforts, repeated day-in and day-out.",
    "If you want to achieve excellence, you can get there today. As of this second, quit doing less-than-excellent work.",
    "All progress takes place outside the comfort zone.",
    "You may only succeed if you desire succeeding; you may only fail if you do not mind failing.",
    "Courage is resistance to fear, mastery of fear--not absence of fear.",
    "Only put off until tomorrow what you are willing to die having left undone.",
    "People often say that motivation doesn't last. Well, neither does bathing--that's why we recommend it daily.",
    "We become what we think about most of the time, and that's the strangest secret.",
    "The only place where success comes before work is in the dictionary.",
    "Too many of us are not living our dreams because we are living our fears.", 
    "I find that when you have a real interest in life and a curious life, that sleep is not the most important thing.",
    "It's not what you look at that matters, it's what you see.",
    "The road to success and the road to failure are almost exactly the same.",
    "The function of leadership is to produce more leaders, not more followers.",
    "Success is liking yourself, liking what you do, and liking how you do it.",
    "As we look ahead into the next century, leaders will be those who empower others.",
    "A real entrepreneur is somebody who has no safety net underneath them.",
    "The first step toward success is taken when you refuse to be a captive of the environment in which you first find yourself.",
    "People who succeed have momentum. The more they succeed, the more they want to succeed, and the more they find a way to succeed. Similarly, when someone is failing, the tendency is to get on a downward spiral that can even become a self-fulfilling prophecy.",
    "When I dare to be powerful, to use my strength in the service of my vision, then it becomes less and less important whether I am afraid.",
    "Whenever you find yourself on the side of the majority, it is time to pause and reflect.",
    "The successful warrior is the average man, with laser-like focus.",
    "There is no traffic jam along the extra mile.",
    "Develop success from failures. Discouragement and failure are two of the surest stepping stones to success.",
    "If you don't design your own life plan, chances are you'll fall into someone else's plan. And guess what they have planned for you? Not much.",
    "If you genuinely want something, don't wait for it--teach yourself to be impatient.",
    "Don't let the fear of losing be greater than the excitement of winning.",
    "If you want to make a permanent change, stop focusing on the size of your problems and start focusing on the size of you!",
    "Two roads diverged in a wood and I  took the one less traveled by, and that made all the difference.",
    "The number one reason people fail in life is because they listen to their friends, family, and neighbors.",
    "The reason most people never reach their goals is that they don't define them, or ever seriously consider them as believable or achievable. Winners can tell you where they are going, what they plan to do along the way, and who will be sharing the adventure with them.",
    "In my experience, there is only one motivation, and that is desire. No reasons or principle contain it or stand against it.",
    "Success does not consist in never making mistakes but in never making the same one a second time.",
    "I don't want to get to the end of my life and find that I lived just the length of it. I want to have lived the width of it as well.",
    "You must expect great things of yourself before you can do them.",
    "Motivation is what gets you started. Habit is what keeps you going.",
    "People rarely succeed unless they have fun in what they are doing.",
    "There is no chance, no destiny, no fate, that can hinder or control the firm resolve of a determined soul.",
    "Our greatest fear should not be of failure but of succeeding at things in life that don't really matter.",
    "You've got to get up every morning with determination if you're going to go to bed with satisfaction.",
    "A goal is not always meant to be reached; it often serves simply as something to aim at.",
    "Success is  knowing your purpose in life, growing to reach your maximum potential, and sowing seeds that benefit others.",
    "Be miserable. Or motivate yourself. Whatever has to be done, it's always your choice.",
    "To accomplish great things, we must not only act, but also dream, not only plan, but also believe.",
    "Most of the important things in the world have been accomplished by people who have kept on trying when there seemed to be no help at all.",
    "You measure the size of the accomplishment by the obstacles you had to overcome to reach your goals.",
    "Real difficulties can be overcome; it is only the imaginary ones that are unconquerable.",
    "It is better to fail in originality than to succeed in imitation.",
    "What would you do if you weren't afraid.",
    "Little minds are tamed and subdued by misfortune; but great minds rise above it.",
    "Failure is the condiment that gives success its flavor.",
    "Don't let what you cannot do interfere with what you can do.",
    "You may have to fight a battle more than once to win it.",
    "A man can be as great as he wants to be. If you believe in yourself and have the courage, the determination, the dedication, the competitive drive and if you are willing to sacrifice the little things in life and pay the price for the things that are worthwhile, it can be done.",
    "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action."

      ],
  },
};




// constructs i18n and l10n data structure
const languageStrings = {

  'en': enData,

};
