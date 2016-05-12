import { mergeDeep } from './object-assign-deep';

export class DictionaryManager {
    constructor(locale) {
        this.locale = locale || window.navigator.language;
	    // By default initialize with browser default
        this.initializeDictionaries(this.locale);
    }

	/**
	 * @description only called once on init to bootstrap a default language with invariants
	 * @param preferredLanguage
	 */
    initializeDictionaries(preferredLanguage) {
        this.dictionaries = {};
		this.addNewTranslation(preferredLanguage, {});
    }

	/**
	 * @description
	 * @param languageKey
	 * @param translations
	 */
    addNewTranslation(languageKey, ...translations) {
		let languageCode = (languageKey.split('-')[0] || '').toLowerCase();
		let variantCode = (languageKey.split('-')[1] || '').toUpperCase();

        if (typeof translations !== 'object') {
            throw new Error('Cannot add new \'translations\' of this type.');
        }

        // Check if dictionary exists
        if (!this.dictionaries.hasOwnProperty(languageCode)) {
            // Create new dictionary
            this.dictionaries[languageCode] = {};
        }

		translations.forEach(translation => {
			// Handle locales
			if (variantCode) {
				if (!this.dictionaries[languageCode].hasOwnProperty(variantCode)) {
					this.dictionaries[languageCode][variantCode] = {};
				}
				this.dictionaries[languageCode][variantCode] = mergeDeep({}, this.dictionaries[languageCode][variantCode], translation);
			} else {
				// Add new translation to dictionary
				this.dictionaries[languageCode] = mergeDeep({}, this.dictionaries[languageCode], translation);
			}
		});
    }

	/**
	 * @description
	 * @param languageKey
	 */
    removeDictionary(languageKey) {
        this.dictionaries[languageKey] = {};
    }
}