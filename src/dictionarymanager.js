var objectAssignDeep = require('object-assign-deep');

export class DictionaryManager {
    constructor() {
        this.locale = window.navigator.language.split('-');
        // TODO: get this from last value used via localStorage
        this.preferredLanguage = this.locale[0];
        this.initializeDictionaries(this.preferredLanguage);
    }

    initializeDictionaries(preferredLanguage) {
        // TODO: recall dictionaries from localStorage
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
        this.dictionaries[languageKey] =  objectAssignDeep({}, this.dictionaries[languageKey], translations);

        // TODO: cache all when new dictionary is added
    }
    removeDictionary(languageKey) {
        this.dictionaries[languageKey] = {};
    }
}