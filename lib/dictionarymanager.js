'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DictionaryManager = undefined;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); // App

var _storage = require('./storage');

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Vendor
var objectAssignDeep = require('object-assign-deep');

var DictionaryManager = exports.DictionaryManager = (function () {
    function DictionaryManager() {
        _classCallCheck(this, DictionaryManager);

        this.storage = new _storage.Storage('dictionary-manager');
        this.storageKey = 'dictionary';

        this.locale = window.navigator.language.split('-');
        // TODO: get this from last value used via localStorage (build preferences)
        this.preferredLanguage = this.locale[0];

        this.initializeDictionaries(this.preferredLanguage);
    }

    _createClass(DictionaryManager, [{
        key: 'initializeDictionaries',
        value: function initializeDictionaries(preferredLanguage) {
            // Recall dictionaries from localStorage
            this.dictionaries = this.storage.getItem(this.storageKey) || {};

            if (!this.dictionaries.hasOwnProperty(preferredLanguage)) {
                // Create new language for preferred language
                this.addNewTranslation(preferredLanguage, {});
            }
        }
    }, {
        key: 'addNewTranslation',
        value: function addNewTranslation(languageKey, translations) {
            if ((typeof translations === 'undefined' ? 'undefined' : _typeof(translations)) !== 'object') {
                throw new Error('Cannot add new \'translations\' of this type.');
            }
            // Check if dictionary exists
            if (!this.dictionaries.hasOwnProperty(languageKey)) {
                // Create new dictionary
                this.dictionaries[languageKey] = {};
            }
            // Add new translation to dictionary
            this.dictionaries[languageKey] = objectAssignDeep({}, this.dictionaries[languageKey], translations);
            // Cache translations
            this.storage.setItem(this.storageKey, this.dictionaries);
        }
    }, {
        key: 'removeDictionary',
        value: function removeDictionary(languageKey) {
            this.dictionaries[languageKey] = {};
        }
    }]);

    return DictionaryManager;
})();