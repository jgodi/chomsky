import { DictionaryManager } from './dictionarymanager';
import { AsyncLoader } from './asyncloader';
import { Invariant } from './invariant';

export class Chomsky {
    constructor() {
        this.dictionaryManager = new DictionaryManager;

	    this.asyncLoader = new AsyncLoader;

	    this.translationsDictionary = this.dictionaryManager.dictionaries;

	    this.changeHandlers = [];

	    this.currentLocale = this.translationsDictionary.locale;

	    this.invariant = new Invariant('en-US');
    }

	/**
	 * @description: private/local method for changing the dictionaryManager language.
	 * @param language
	 * @param translation
	 */
    addTranslation(language, translation) {
        this.dictionaryManager.addNewTranslation(language, translation);
    }

    translationFetcher(url) {
        return this.asyncLoader.load(url);
    }

	/**
	 * @description: This is the change handler for broadcasting translations
	 * @param callback
	 */
    onChange(callback) {
        if (callback && typeof callback === 'function') {
            this.changeHandlers.push(callback);
        }
    }

	/**
	 * @description: public method for changing the language
	 * @param languageKey MUST BE formatted as such: 'en-us' or 'en'
	 * @param translationObject
	 * @returns {Promise}
	 */
    setLanguage(languageKey, translationObject = null) {
        return new Promise((resolve, reject) => {
            // Now, only language is required
            if (languageKey) {
	            if ((languageKey.length > 2 && languageKey.indexOf('-') !== -1) || languageKey.length === 2) {
		            this.currentLocale = languageKey;
		            this.invariant.setLocale(this.currentLocale);
		            if (typeof translationObject == 'object') {
			            this.applyLanguage(languageKey, translationObject);
			            resolve();
		            } else {
			            this.resolveTranslationObject(translationObject)
				            .then(asyncTranslationObject => {
					            this.applyLanguage(languageKey, asyncTranslationObject);
					            resolve();
				            }, error => {
					            reject(error);
				            });
		            }
	            } else {
		            reject('setLanguage: languageKey is not structured correctly.');
	            }
            } else {
                reject('setLanguage: languageKey is mandatory');
            }
        });
    }

	/**
	 * @description This method is the setter for the active language
	 * @param language
	 * @param translationObject
	 */
    applyLanguage(language, translationObject) {
        this.currentLocale = language;
        this.addTranslation(language, translationObject);
        this.changeHandlers.forEach((callback) => callback());
    }

	/**
	 * @description This method is the async loader for loading remote translations
	 * @param language
	 * @returns {Promise}
	 */
    resolveTranslationObject(language) {
        return new Promise((resolve, reject) => {
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
        return this.invariant.formatDate(date, format);
    }

    constructCurrency(currency, currencyCode) {
        return this.invariant.formatCurrency(currency, currencyCode);
    }

	getValue(key, languageCode, variantCode) {
		let value = '';
		let dictionary = this.translationsDictionary[languageCode];
		if (variantCode) {
			dictionary = this.translationsDictionary[languageCode][variantCode];
		}
		let tokens = key.split('.');
		for (let i = 0; i < tokens.length && value !== undefined; i++) {
			value = dictionary[tokens[i]];
		}
		return value;
	}

    translate(key, interpolation, pluralValue) {
	    let languageCode = (this.currentLocale.split('-')[0] || '').toLowerCase();
	    let variantCode = (this.currentLocale.split('-')[1] || '').toUpperCase();
	    let value = this.getValue(key, languageCode, variantCode) || this.getValue(key, languageCode);

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
                        case 'number':
                            return this.invariant.formatNumber(unparsedValue);
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