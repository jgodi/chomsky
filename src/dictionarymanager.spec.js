import {DictionaryManager} from './dictionarymanager';

describe('Class: DictionaryManager', () => {

    it('should init with defaults.', () => {
        let instance = new DictionaryManager;
        expect(instance).toBeDefined();
        expect(instance.locale).toBeDefined();
        expect(instance.locale.length).toBe(2);
        // It should have a preferred language
        expect(instance.preferredLanguage).toBeDefined();
        expect(instance.dictionaries).toBeDefined();
    });

    describe('Method: initializeDictionaries()', () => {
        // TODO: add spec for localStorage retrieval
        it('should initialize the DictionaryManager with a default dictionary.', () => {
            let instance = new DictionaryManager;
            expect(instance.initializeDictionaries).toBeDefined();
            expect(instance.dictionaries[instance.preferredLanguage]).toBeDefined();
        });
    });

    describe('Method: addNewTranslation(languageKey, translations)', () => {
        let instance;
        beforeEach(() => {
            instance = new DictionaryManager;
        });

        it('should create a new dictionary when there isn\'t one.', () => {
            expect(instance.addNewTranslation).toBeDefined();
            let mockFrenchTranslations = {
                greeting: 'Bonjour'
            };
            let mockSpanishTranslations = {
                greeting: 'Hola'
            };
            instance.addNewTranslation('fr', mockFrenchTranslations);
            expect(instance.dictionaries['fr']).toBeDefined();
            expect(instance.dictionaries['fr'].greeting).toBe('Bonjour');
            instance.addNewTranslation('es', mockSpanishTranslations);
            expect(instance.dictionaries['es']).toBeDefined();
            expect(instance.dictionaries['es'].greeting).toBe('Hola');

        });

        it('should create merge translations when there is a dictionary.', () => {
            expect(instance.addNewTranslation).toBeDefined();
            let mockFrenchTranslations = {
                greeting: 'Bonjour'
            };
            let mockFrenchTranslations2 = {
                farewell: 'Au Revoir'
            };
            let mockLanguageKey = 'fr';
            instance.addNewTranslation(mockLanguageKey, mockFrenchTranslations);
            expect(instance.dictionaries['fr']).toBeDefined();
            expect(instance.dictionaries['fr'].greeting).toBe('Bonjour');
            instance.addNewTranslation(mockLanguageKey, mockFrenchTranslations2);
            expect(instance.dictionaries['fr']).toBeDefined();
            expect(instance.dictionaries['fr'].greeting).toBe('Bonjour');
            expect(instance.dictionaries['fr'].farewell).toBe('Au Revoir');
        });

        it('should create a new dictionary when there isn\'t one.', () => {
            expect(instance.addNewTranslation).toBeDefined();
        });
    });

    describe('Method: removeDictionary(languageKey)', () => {
        it('remove a dictionary from the DictionaryManager.', () => {
            let instance = new DictionaryManager;
            expect(instance.removeDictionary).toBeDefined();
            let mockFrenchTranslations = {
                greeting: 'Bonjour'
            };
            let mockLanguageKey = 'fr';
            instance.addNewTranslation(mockLanguageKey, mockFrenchTranslations);
            expect(instance.dictionaries['fr']).toBeDefined();
            expect(instance.dictionaries['fr'].greeting).toBe('Bonjour');
            instance.removeDictionary(mockLanguageKey);
            expect(instance.dictionaries['fr']).toBeDefined();
            expect(instance.dictionaries['fr'].greeting).toBeUndefined();
        });
    });

});
