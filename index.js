/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const SKILL_NAME = 'Contrepèterie';
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say ' +
	'exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const FALLBACK_MESSAGE = 'The Space Facts skill can\'t help you with that.' +
	' It can help you discover facts about space if you say tell me a space' +
	' fact. What can I help you with?';
const FALLBACK_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'À bientôt!';

const dataNewOne = [
	'Voici votre contrepèterie : ',
	'J\'ai une contrepèterie pour vous : ',
	'Votre contrepèterie est : ',
];

const data = [
	'J’ai glissé dans la piscine.',
	'Le choix dans la date.',
	'J’aime vachement votre frangin.',
	'Salut Fred !',
	'Retire ta lampe que je guette.',
	'Les nouilles cuisent au jus de canne.',
	'Nadal a un tennis prévisible.',
	'Nul n\'est jamais assez fort pour ce calcul.',
	'Superman a une bouille incroyable.',
	'Les populations du Cap mettent les échecs en valeur.',
	'Goûter-moi cette farce !.',
	'Le pope réclame un graphiste.',
	'Mots fléchés.',
	'Un champ de coton.',
	'Mets ta casquette.',
	'Qui a véhiculé le Président flambant.',
	'Chaques nuit, l\'horticulteur rêve de serres de pins',
	'Quand les athées de battent, les abbés se taisent',
	'Elle a quitté la ferme pleine d\'espoir jusqu\'au pount du Jura',
	'L\'entraineur tâte la crosse de la hockeyeuse.',
	'Arriver à Béziers la veille.',
	'Jean-Paul, le pape hautain.',
	'Le professeur vante la constitution.',
	'La cuvette est pleine de bouillon.',
	'Le révérend arrive à la pièce plein de mormons.',
	'Les salières me font dériver.',
	'Défense aux dames patronesses de quêter sur un pliant.',
	'Attention vous videz vos nouilles sur ma cape !',
	'Avec leur nouveau règlement sur les munitions, ils nous en perdent.',
	'Ce garçon de douze ans déclare qu\'il jouera au tennis à présent.',
	'Il faut savoir tirer un trait d\'un seul coup, explique l\'arbalétrier.',
	'La montagnarde a encore entassé ses crampons.',
	'Le tout était trop confus pour laisser une possibilité d\'ouverture.',
	'Les cyclistes ont de drôles de bouilles, sans cycles.',
	'Les colonnes de gauchistes de branchent sur l\'Irak.',
	'L\'Irak n\'a qu\'une toute petite chance.',
	'Est ce que la canicule t\'emballe.',
	'Il faut couper les nouilles au sécateur.',
	'Regardez ce chat qui rit !',
	'Le champion jette avec puissance.',
	'Le facteur ne veut pas qu\'on chipotte quand il trie.'
	
];

const GetNewFactHandler = {
	canHandle(handlerInput) {
		const {request} = handlerInput.requestEnvelope;
		return request.type === 'LaunchRequest' ||
			(request.type === 'IntentRequest' &&
				request.intent.name === 'GetNewFactIntent');
	},
	handle(handlerInput) {
		const numberN = Math.floor(Math.random() * dataNewOne.length);
		const numberD = Math.floor(Math.random() * data.length);
		const newData = dataNewOne[numberN];
		const randomFact = data[numberD];
		
		const speechOutput = newData + randomFact;

		return handlerInput.responseBuilder
			.speak(speechOutput)
			.withSimpleCard(SKILL_NAME, randomFact)
			.getResponse();
	}
};

const HelpHandler = {
	canHandle(handlerInput) {
		const {request} = handlerInput.requestEnvelope;
		return request.type === 'IntentRequest' &&
			request.intent.name === 'AMAZON.HelpIntent';
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak(HELP_MESSAGE)
			.reprompt(HELP_REPROMPT)
			.getResponse();
	}
};

const FallbackHandler = {
	canHandle(handlerInput) {
		const {request} = handlerInput.requestEnvelope;
		return request.type === 'IntentRequest' &&
			request.intent.name === 'AMAZON.FallbackIntent';
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak(FALLBACK_MESSAGE)
			.reprompt(FALLBACK_REPROMPT)
			.getResponse();
	}
};

const ExitHandler = {
	canHandle(handlerInput) {
		const {request} = handlerInput.requestEnvelope;
		return request.type === 'IntentRequest' &&
			(request.intent.name === 'AMAZON.CancelIntent' ||
				request.intent.name === 'AMAZON.StopIntent');
	},
	handle(handlerInput) {
		return handlerInput.responseBuilder
			.speak(STOP_MESSAGE)
			.getResponse();
	}
};

const SessionEndedRequestHandler = {
	canHandle(handlerInput) {
		const {request} = handlerInput.requestEnvelope;
		return request.type === 'SessionEndedRequest';
	},
	handle(handlerInput) {
		console.log(`Session ended with reason:
			${handlerInput.requestEnvelope.request.reason}`);

		return handlerInput.responseBuilder.getResponse();
	}
};

const ErrorHandler = {
	canHandle() {
		return true;
	},
	handle(handlerInput, error) {
		console.log(`Error handled: ${error.message}`);

		return handlerInput.responseBuilder
			.speak('Sorry, an error occurred.')
			.reprompt('Sorry, an error occurred.')
			.getResponse();
	}
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
	.addRequestHandlers(
		GetNewFactHandler,
		HelpHandler,
		ExitHandler,
		FallbackHandler,
		SessionEndedRequestHandler
	)
	.addErrorHandlers(ErrorHandler)
	.lambda();
