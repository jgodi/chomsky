import { mergeDeep } from './object-assign-deep';

export class DictionaryManager {
    constructor() {
        this.locale = window.navigator.language;
        // TODO: get this from last value used via localStorage (build preferences)
        this.preferredLanguage = this.locale;

        this.initializeDictionaries(this.preferredLanguage);
    }

    initializeDictionaries(preferredLanguage) {
        this.dictionaries = {};

        if (!this.dictionaries.hasOwnProperty(preferredLanguage)) {
            // Create new language for preferred language
            this.addNewTranslation(preferredLanguage, {});
        }
    }

    addNewTranslation(languageKey, translations) {
        if (typeof translations !== 'object') {
            throw new Error('Cannot add new \'translations\' of this type.');
        }
        // Check if dictionary exists
        if (!this.dictionaries.hasOwnProperty(languageKey)) {
            // Create new dictionary
            this.dictionaries[languageKey] = {};
        }
        // Add new translation to dictionary
        this.dictionaries[languageKey] = mergeDeep({}, this.dictionaries[languageKey], translations);
    }

    removeDictionary(languageKey) {
        this.dictionaries[languageKey] = {};
    }
}