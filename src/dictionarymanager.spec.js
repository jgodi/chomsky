/* globals describe, it, xit, expect, afterEach, beforeEach */
import { DictionaryManager } from './dictionarymanager';

describe('Class: DictionaryManager', () => {
	let dictionaryManager;
	beforeEach(() => {
		dictionaryManager = new DictionaryManager;
	});

	it('should initialize with a locale and default dictionary when no local is specified.', () => {

		expect(dictionaryManager.locale).toBeDefined();
	    expect(dictionaryManager.locale).toBe('en-US');
	    expect(dictionaryManager.dictionaries.en.US).toBeDefined();
	});
	// TODO: add this too
	xit('should initialize with a locale and default dictionary when a local is specified.', () => {
		let dictionaryManager = new DictionaryManager('en-GB');
		expect(dictionaryManager.locale).toBeDefined();
		expect(dictionaryManager.locale).toBe('en-GB');
		expect(dictionaryManager.dictionaries.en.GB).toBeDefined();
	});

	describe('Function: addNewTranslation(languageKey, translations)', () => {
		it('should add a new translation to the variant dictionary.', () => {
			expect(dictionaryManager.dictionaries.en.US).toBeDefined();
		    expect(dictionaryManager.dictionaries.en.GB).not.toBeDefined();
			dictionaryManager.addNewTranslation('en-GB', { GREETING: 'Derp' });
			expect(dictionaryManager.dictionaries.en.GB).toBeDefined();
			expect(dictionaryManager.dictionaries.en.GB.GREETING).toBe('Derp');
		});

		it('should add a new translation to the language dictionary.', () => {
			expect(dictionaryManager.dictionaries.en.US).toBeDefined();
			expect(dictionaryManager.dictionaries.en.GB).not.toBeDefined();
			dictionaryManager.addNewTranslation('en', { GREETING: 'Derp' });
			expect(dictionaryManager.dictionaries.en.GREETING).toBe('Derp');
		});

		it('should add a new complex translation to the language dictionary.', () => {
			expect(dictionaryManager.dictionaries.en.US).toBeDefined();
			let mockTranslation = {
				pageOne: {
					greeting: 'Hello',
					componentOne: {
						label: 'Component One'
					}
				}
			};
			dictionaryManager.addNewTranslation('en-US', mockTranslation);
			expect(dictionaryManager.dictionaries.en.US.pageOne.greeting).toBe('Hello');
			expect(dictionaryManager.dictionaries.en.US.pageOne.componentOne.label).toBe('Component One');
		});

		it('should merge complex translations to the language dictionary.', () => {
			expect(dictionaryManager.dictionaries.en.US).toBeDefined();
			let mockTranslationOne = {
				pageOne: {
					greeting: 'Hello',
					componentOne: {
						label: 'Component One'
					}
				}
			};
			let mockTranslationTwo = {
				pageOne: {
					componentTwo: {
						label: 'Component Two'
					}
				}
			};
			dictionaryManager.addNewTranslation('en-US', mockTranslationOne);
			dictionaryManager.addNewTranslation('en-US', mockTranslationTwo);
			expect(dictionaryManager.dictionaries.en.US.pageOne.greeting).toBe('Hello');
			expect(dictionaryManager.dictionaries.en.US.pageOne.componentOne.label).toBe('Component One');
			expect(dictionaryManager.dictionaries.en.US.pageOne.componentTwo.label).toBe('Component Two');
		});
		xit('should merge complex translations to the language dictionary and allow multiple translations at once.', () => {
			expect(dictionaryManager.dictionaries.en.US).toBeDefined();
			let mockTranslationOne = {
				pageOne: {
					greeting: 'Hello',
					componentOne: {
						label: 'Component One'
					}
				}
			};
			let mockTranslationTwo = {
				pageOne: {
					componentTwo: {
						label: 'Component Two'
					}
				}
			};
			dictionaryManager.addNewTranslation('en-US', mockTranslationOne, mockTranslationTwo);
			expect(dictionaryManager.dictionaries.en.US.pageOne.greeting).toBe('Hello');
			expect(dictionaryManager.dictionaries.en.US.pageOne.componentOne.label).toBe('Component One');
			expect(dictionaryManager.dictionaries.en.US.pageOne.componentTwo.label).toBe('Component Two');
		});
	});
});
