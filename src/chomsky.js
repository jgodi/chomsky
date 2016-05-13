import { DictionaryManager } from './dictionarymanager';
import { AsyncLoader } from './asyncloader';
import { Formats } from './formats';

export class Chomsky {
    constructor(locale) {
	    this.dictionaryManager = new DictionaryManager(locale);
	    this.asyncLoader = new AsyncLoader;
	    this.translationsDictionary = this.dictionaryManager.dictionaries;
	    this.changeHandlers = [];
	    this.currentLocale = this.dictionaryManager.locale;
	    this.formats = new Formats(this.currentLocale);
    }

	/**
	 * @description: private/local method for changing the dictionaryManager language.
	 * @param languageCode
	 * @param translations
	 */
    addTranslation(languageCode, translations) {
        this.dictionaryManager.addNewTranslation(languageCode, translations);
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
	 * @param languageKey MUST BE formatted as such: 'en-US' or 'en'
	 * @param translationObject
	 * @returns {Promise}
	 */
    setLanguage(languageKey, translationObject = null) {
        return new Promise((resolve, reject) => {
            // Now, only language is required
            if (languageKey) {
	            if ((languageKey.length > 2 && languageKey.indexOf('-') !== -1) || languageKey.length === 2) {
		            this.currentLocale = languageKey;
		            this.formats.setLocale(this.currentLocale);
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
		// Handle overrides
		if (translationObject && translationObject.hasOwnProperty('formats')) {
			this.formats.override(translationObject.formats);
			delete translationObject['formats'];
		}
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

	/**
	 *
	 * @param key
	 * @param languageCode
	 * @param variantCode
	 * @returns {string}
	 */
	getValue(key, languageCode, variantCode) {
		let value = '';
		let dictionary = this.translationsDictionary[languageCode];
		if (variantCode) {
			dictionary = this.translationsDictionary[languageCode][variantCode];
		}
		let tokens = key.split('.');
		for (let i = 0; i < tokens.length; i++) {
			if (!value) {
				value = dictionary[tokens[i]];
			} else {
				value = value[tokens[i]];
			}
		}
		return value;
	}

	/**
	 * @name translate
	 * @param key
	 * @param interpolation
	 * @param pluralValue
	 * @returns {string}
	 */
    translate(key, interpolation) {
	    let languageCode = (this.currentLocale.split('-')[0] || '').toLowerCase();
	    let variantCode = (this.currentLocale.split('-')[1] || '').toUpperCase();
	    let value = this.getValue(key, languageCode, variantCode) || this.getValue(key, languageCode);
        // Handle pluralization
        if (typeof value === 'object') {
            if (typeof interpolation === 'number') {
	            let pluralization = value;
                // If pluralValue holds the number `X`, check whether `X` is a key in pluralization.
                // If it is, use the phrase of `X`. Otherwise, use `zero` or `many`.
                if (pluralization.hasOwnProperty(interpolation)) {
                    value = pluralization[interpolation];
                } else {
                    if (interpolation === 0) {
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
        if (interpolation && value) {
            value = value.replace(/{([^}]*)}/gi, (m, param) => {
                let params = param.split(':');
                if (params.length === 1) {
                    let match = '';
                    if (interpolation.hasOwnProperty(param)) {
                        match = interpolation[param];
                    }
                    return match;
                }
                let unparsedValue = interpolation[params[0]];
                switch (params[1]) {
                    case 'date':
                        return this.formats.formatDate(unparsedValue, (params[2] || undefined), (params[3] || undefined));
                    case 'currency':
                        return this.formats.formatCurrency(unparsedValue, (params[2] || undefined), (params[3] || undefined));
                    case 'number':
                        return this.formats.formatNumber(unparsedValue, (params[2] || undefined), (params[3] || undefined));
                    default:
                        return '';
                }
            });
        }

		// Return the key if no value is present.
        return value || key;
    }
}

export default Chomsky;