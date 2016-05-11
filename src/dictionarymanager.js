import { mergeDeep } from './object-assign-deep';

export class DictionaryManager {
    constructor() {
        this.locale = window.navigator.language;
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
    addNewTranslation(languageKey, translations) {
		let languageCode = (languageKey.split('-')[0] || '').toLowerCase();
		let localeCode = (languageKey.split('-')[1] || '').toUpperCase();

        if (typeof translations !== 'object') {
            throw new Error('Cannot add new \'translations\' of this type.');
        }

        // Check if dictionary exists
        if (!this.dictionaries.hasOwnProperty(languageCode)) {
            // Create new dictionary
            this.dictionaries[languageCode] = {};
        }
		// Handle locales
		if (localeCode) {
			if (!this.dictionaries[languageCode].hasOwnProperty(localeCode)) {
				this.dictionaries[languageCode][localeCode] = {};
			}
			this.dictionaries[languageCode][localeCode] = mergeDeep({}, this.dictionaries[languageCode][localeCode], translations);
		} else {
			// Add new translation to dictionary
			this.dictionaries[languageCode] = mergeDeep({}, this.dictionaries[languageCode], translations);
		}
    }

	/**
	 * @description
	 * @param languageKey
	 */
    removeDictionary(languageKey) {
        this.dictionaries[languageKey] = {};
    }
}