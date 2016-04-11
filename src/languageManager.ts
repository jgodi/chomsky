import {AsyncLoader} from './asyncLoader';
import {CacheManager} from './cacheManager';

import {invariant} from './i18n/invariant';



export class LanguageManager {
	defaults: Object;
	asyncLoader: AsyncLoader;
	invariants: Object = invariant;
	cacheManager: CacheManager;
	translations: Object;

	constructor () {
		this.asyncLoader = new AsyncLoader;
		this.cacheManager = new CacheManager;
		// Get current defaults
		this.defaults = this.merge(this.invariants, this.cacheManager.get());
		// Init a list of translations
		this.translations = this.defaults['translations'] || {};

		// Store defaults
		this.updateCache();
	}

	requestUrl(url) {
		this.asyncLoader.get(url)
			.then(res => {
				console.log(res);
			}, err => {
				console.log(err);
			})
	}

	/**
	 * Add a translation
	 * @param id
	 * @param language
	 * @param translation
	 */
	addTranslation(id:string, language:string, translation:string) {
		// Add a language if it doesn't exist
		if (!this.translations.hasOwnProperty(language)) {
			this.addLanguage(language);
		}

		this.translations[language][id] = translation;

		this.defaults['translations'][language] = this.translations[language];
		// Update localStorage
		this.updateCache();
	}

	/**
	 * Add a language
	 *
	 * @param language
	 */
	addLanguage(language: string) {
		this.translations[language] = {};
		this.defaults['translations'][language] = {};
		this.updateCache();
	}

	changeLanguage(languageKey: string) {
		this.defaults['language'] = languageKey;
	}

	/**
	 * @name merge
	 *
	 * @param object1
	 * @param object2
	 * @returns {Object} - mergedObject
	 *
	 * @description Merges two objects into one (Object.assign).
	 */
	private merge(object1, object2){
		var mergedObject = {};
		for (let attributeName in object1) {
			mergedObject[attributeName] = object1[attributeName];
		}
		for (let attributeName in object2) {
			mergedObject[attributeName] = object2[attributeName];
		}
		return mergedObject;
	}

	getLanguage(language?: string) {
		if (language) {
			return this.translations[language];
		} else {
			return this.translations;
		}
	}

	private updateCache() {
		this.cacheManager.set(this.defaults);
	}
}