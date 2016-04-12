// App
import {DictionaryManager} from './dictionarymanager';
import {AsyncLoader} from './asyncloader';
// Vendor
var moment = require('moment');

export class Chomsky {
	constructor() {
		this.dictionaryManager = new DictionaryManager;
		this.asyncLoader = new AsyncLoader;

		this.translationsDictionary = this.dictionaryManager.dictionaries;

		this.changeHandlers = [];
	}

	addTranslation(language, translation) {
		this.dictionaryManager.addNewTranslation(language, translation);
	}

	translationFetcher(url) {
		return this.asyncLoader.load(url);
	}

	onChange(callback) {
		if (callback && typeof callback === 'function') {
			this.changeHandlers.push(callback);
		}
	}

	setLanguage(language, translationObject = null) {
		if (!translationObject) {
			translationObject = this.translationsDictionary[language];
		}
		return new Promise((resolve, reject) => {
			// Now, only language is required
			if (language) {
				if (this.currentLanguage === language) {
					resolve();
				} else if (translationObject) {
					this.applyLanguage(language, translationObject);
					resolve();
				} else {
					this.resolveTranslationObject(language)
						.then(
							translationObject => {
								this.applyLanguage(language, translationObject);
								resolve();
							},
							reason => reject(reason)
						);
				}
			} else {
				reject('setLanguage: language is mandatory');
			}
		});
	}

	applyLanguage(language, translationObject) {
		this.currentLanguage = language;

		//this.currentDictionary = this.dictionaryManager.dictionaries[language];

		//this.dictionaryManager.addNewTranslation(language, translationObject);
		this.changeHandlers.forEach((callback) => callback());
	}

	resolveTranslationObject(language) {
		return new Promise((resolve, reject) => {
			//var promise = ;

			if (!promise || typeof promise.then !== 'function') {
				reject('translationFetcher should return a promise');
			}

			this.translationFetcher(language)
				.then(translationObject => {
						if (translationObject) {
							resolve(translationObject);
						} else {
							reject('translationFetcher resolved without translation object');
						}
					},
					reason => reject(`translationFetcher failed: ${reason}`)
				);
		});
	}

	constructDate(date, format) {
		let dateString = '';
		if (!format) {
			dateString = moment(date).format('MM[/]DD[/]YYYY');
		} else {
			dateString = moment(date).format(format);
		}
		return dateString;
	}

	constructCurrency(currency, denominator) {
		return denominator + currency.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	translate(key, interpolation, pluralValue) {
		let tokens = key.split('.');
		let value = this.translationsDictionary[this.currentLanguage];

		for (let i = 0; i < tokens.length && value !== undefined; i++) {
			value = value[tokens[i]];
		}

		if (value === undefined) {
			value = '';
		}

		// Handle pluralization
		if (typeof value === 'object') {
			if (typeof pluralValue === 'number') {
				let pluralization = value;
				// If pluralValue holds the number `X`, check whether `X` is a key in pluralization.
				// If it is, use the phrase of `X`. Otherwise, use `zero` or `many`.
				if (pluralization.hasOwnProperty(pluralValue)) {
					value = pluralization[pluralValue];
				} else {
					if (pluralValue === 0) {
						value = pluralization.zero;
					} else {
						// pluralValue is a number and not equals to 0, therefore pluralValue > 0
						value = pluralization.many;
					}
				}
			} else {
				value = '';
			}
		}

		// Handle interpolation
		if (interpolation) {
			value = value.replace(/{([^}]*)}/gi, (m, param) => {
				let key = param.split(':');
				if (key.length === 1) {
					let match = '';
					if (interpolation.hasOwnProperty(param)) {
						match = interpolation[param];
					}
					return match;
				} else {
					let unparsedValue = interpolation[key[0]];
					switch (key[1]) {
						case 'date':
							return this.constructDate(unparsedValue, key[2]);
						case 'currency':
							return this.constructCurrency(unparsedValue, key[2]);
						default:
							return '';
					}
				}
			});
		}

		return value;
	}
}

export default Chomsky;