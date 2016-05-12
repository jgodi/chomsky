import { Chomsky } from './chomsky';

describe('Class: Chomsky', () => {

    it('should initialize with all it\'s defaults.', () => {
        let instance = new Chomsky;
        expect(instance).toBeDefined();
        expect(instance.dictionaryManager).toBeDefined();
        expect(instance.asyncLoader).toBeDefined();
        expect(instance.translationsDictionary).toBeDefined();
        expect(instance.changeHandlers).toBeDefined();
        expect(instance.currentLocale).toBe('en-US');
        expect(instance.formats).toBeDefined();
    });

	it('should initialize with a predefined locale (if provided).', () => {
		let instance = new Chomsky('en-GB');
		expect(instance).toBeDefined();
		expect(instance.dictionaryManager).toBeDefined();
		expect(instance.asyncLoader).toBeDefined();
		expect(instance.translationsDictionary).toBeDefined();
		expect(instance.changeHandlers).toBeDefined();
		expect(instance.currentLocale).toBe('en-GB');
		expect(instance.formats).toBeDefined();
	});

	describe('Function: addTranslation(languageCode, translation)', () => {
	    let chomsky;
		beforeEach(() => {
	        chomsky = new Chomsky;
	    });
		it('should be defined.', () => {
	        expect(chomsky.addTranslation).toBeDefined();
	    });
	});

	describe('Function: translationFetcher(url)', () => {
		let chomsky;
		beforeEach(() => {
			chomsky = new Chomsky;
		});
		it('should be defined.', () => {
			expect(chomsky.translationFetcher).toBeDefined();
		});
	});

	describe('Function: addTranslation(languageCode, translation)', () => {
		let chomsky;
		beforeEach(() => {
			chomsky = new Chomsky;
		});
		it('should be defined.', () => {
			expect(chomsky.addTranslation).toBeDefined();
		});
	});

	describe('Function: onChange(callback)', () => {
		let chomsky;
		beforeEach(() => {
			chomsky = new Chomsky;
		});
		it('should be defined.', () => {
			expect(chomsky.onChange).toBeDefined();
		});
	});

	describe('Function: setLanguage(languageKey, translationObject)', () => {
		let chomsky;
		beforeEach(() => {
			chomsky = new Chomsky;
		});
		it('should be defined.', () => {
			expect(chomsky.setLanguage).toBeDefined();
		});
	});

	describe('Function: applyLanguage(language, translationObject)', () => {
		let chomsky;
		beforeEach(() => {
			chomsky = new Chomsky;
		});
		it('should be defined.', () => {
			expect(chomsky.applyLanguage).toBeDefined();
		});
	});

	describe('Function: resolveTranslationObject(language)', () => {
		let chomsky;
		beforeEach(() => {
			chomsky = new Chomsky;
		});
		it('should be defined.', () => {
			expect(chomsky.resolveTranslationObject).toBeDefined();
		});
	});

	describe('Function: getValue(key, languageCode, variantCode)', () => {
		let chomsky;
		beforeEach(() => {
			chomsky = new Chomsky;
		});
		it('should be defined.', () => {
			expect(chomsky.getValue).toBeDefined();
		});
	});

	describe('Function: translate(key, interpolation, pluralValue)', () => {
		let chomsky;
		beforeEach(() => {
			chomsky = new Chomsky;
		});
		it('should be defined.', () => {
			expect(chomsky.translate).toBeDefined();
		});
	});
});
