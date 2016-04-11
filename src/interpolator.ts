/// <reference path="../typings/moment/moment.d.ts" />
import {CacheManager} from './cacheManager';
import {LanguageManager} from './languageManager';


export class Interpolator {
	languageManager: LanguageManager;
	constructor () {
		this.languageManager = new LanguageManager;
	}

	private render(phrase: string, dynamicVars: Object) {
		let parsedString: string;
		// Regex to GREP values between {}
		let regex = /{([^}]*)}/g;
		// Break phrase apart
		let brokenPhrase = phrase.split(regex);

		// Need this for typing
		let dynamicVariables = phrase.match(/[^{}]+(?=\})/g);

		if (dynamicVariables.length) {
			dynamicVariables.forEach(dynamicKey => {
				let key = dynamicKey.split(':');
				let dynamicIndex = brokenPhrase.indexOf(dynamicKey);
				if (key.length === 1) {
					if (dynamicIndex !== -1) {
						brokenPhrase[dynamicIndex] = dynamicVars[dynamicKey];
					}
				} else {
					let parsedValue: string;
					let unparsedValue = dynamicVars[key[0]];
					switch (key[1]) {
						case 'date':
							parsedValue = this.constructDate(unparsedValue, key[2]);
							break;
						case 'currency':
							parsedValue = this.constructCurrency(unparsedValue);
							break;
						default:
							parsedValue = '';
					}
					brokenPhrase[dynamicIndex] = parsedValue;
				}
			});
		}

		parsedString = brokenPhrase.join('');

		return parsedString;
	}

	private constructDate(date: string, format?: string): string {
		let dateString: string;
		if (!format) {
			dateString = moment(date).format(this.languageManager.defaults['shortDate']);
		} else {
			dateString = moment(date).format(format);
		}
		return dateString;
	}

	private constructCurrency(currency: string): string {
		let currencyType: string;
		switch (this.languageManager.defaults['currency']['denomination']) {
			case 'USD':
				currencyType = '$';
				break;
			case 'EUR':
				currencyType = '‎€';
				break;
			default:
				currencyType = '';
		}
		return currencyType + currency.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	translate(phraseKey:string, dynamicVars?: Object) {
		let defaultLanguage = this.languageManager.defaults['language'];
		let phrases: Object = this.languageManager.getLanguage(defaultLanguage);
		if (phrases) {
			let phrase: string = phrases[phraseKey];
			if (phrase) {
				if (!dynamicVars) {
					return phrase;
				} else {
					return this.render(phrase, dynamicVars);
				}
			} else {
				console.log('Phrase Key provided doesn\'t have a translation.');
				return '';
			}
		} else {
			console.warn('Specified language does not exist.');
			return '';
		}
	}
}