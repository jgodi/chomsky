// App
import {Storage} from './storage';
// Vendor
var objectAssignDeep = require('object-assign-deep');

export class DictionaryManager {
    constructor() {
        this.storage = new Storage('dictionary-manager');
        this.storageKey = 'dictionary';

        this.locale = window.navigator.language;
        // TODO: get this from last value used via localStorage (build preferences)
        this.preferredLanguage = this.locale;

        this.initializeDictionaries(this.preferredLanguage);
    }

    initializeDictionaries(preferredLanguage) {
        // Recall dictionaries from localStorage
        this.dictionaries = this.storage.getItem(this.storageKey) || {};

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
        // Cache translations
        this.storage.setItem(this.storageKey, this.dictionaries);
    }
    removeDictionary(languageKey) {
        this.dictionaries[languageKey] = {};
    }
}