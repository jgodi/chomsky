// Vendor
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/share';
// APP
import { Loader } from './loader';
import { Formats, IFormatDefaults } from './formats';
import { DictionaryManager } from './dictionary-manager';
import { mergeDeep } from './object-assign-deep';

// Default formats
const FORMAT_DEFAULTS: IFormatDefaults = {
    number: {
        style: 'decimal',
        maximumSignificantDigits: 2
    },
    currency: {
        style: 'currency',
        currency: 'USD',
        maximumSignificantDigits: 2
    },
    date: {
        short: { // DD/MM/YYYY, HH:MM A - 02/14/2017, 1:17 PM
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        },
        medium: { // MMM DD, YYYY, HH:MM A - Feb 14, 2017, 1:17 PM
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        },
        long: { // MMMM DD, YYYY, HH:MM A Z - Febuary 14, 2017, 1:17 PM CST
            month: 'long',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        },
        dateShort: { // DEFAULT: DD/MM/YYYY - 02/14/2017
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        },
        dateMedium: { // MMM DD, YYYY - Feb 14, 2017
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        },
        dateLong: { // MMMM DD, YYYY - Febuary 14, 2017
            month: 'long',
            day: '2-digit',
            year: 'numeric'
        },
        timeShort: { // HH:MM A - 1:17 PM
            hour: '2-digit',
            minute: '2-digit'
        },
        timeLong: { // HH:MM A Z - 1:17 PM CST
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        }
    }
};

export class Chomsky {
    // Loader to load translations from a JSON file
    private loader: Loader = new Loader();
    // Default location for translations
    private location: string = 'i18n/';
    // Current locale
    private currentLocale: string = window.navigator.language;
    // Dictionary Manger to handle translations that have been loaded
    private dictionaryManager = new DictionaryManager();
    // Custom formats based on the locale
    private formats = new Formats();
    // Current pending call to fetch translations
    private pending: any;
    // Object for default replacements, so users don't have to pass around each time
    private defaultReplacements: any = {};
    // Handle for when the locale changes
    public onLocaleChange: Subject<string> = new Subject<string>();

    constructor(locale?: string) {
        if (locale) {
            this.use(locale);
        }
    }

    public setLocation(location: string): void {
        this.location = location;
    }

    public setDefaultReplacements(defaultReplacements: any): void {
        this.defaultReplacements = defaultReplacements;
    }

    public use(locale: string): Observable<any> {
        // Capture the pending task
        let pending;
        // If we don't have the translations, load them
        if (!this.dictionaryManager.get(locale)) {
            pending = this.getTranslations(locale);
        }
        // Return the pending if we are fetching
        if (typeof pending !== 'undefined') {
            return pending;
        } else {
            // Split out the language code from the locale
            let languageCode = (locale.split('-')[0] || '').toLowerCase();
            // Return the translations if they are already loaded
            let currentTranslations = [this.dictionaryManager.get(locale), this.dictionaryManager.get(languageCode)];
            this.applyLanguage(locale, currentTranslations[0], currentTranslations[1]);
            return Observable.of(currentTranslations);
        }
    }

    public translate(key: string, interpolation?: any): string {
        let value: any = this.getValue(key);
        // Handle pluralization
        if (value && typeof value === 'object') {
            if (typeof interpolation === 'object') {
                let gender = interpolation.gender || 'other';
                if (gender) {
                    if (interpolation.quantity === 0 || interpolation.quantity) {
                        if (value[gender].hasOwnProperty(interpolation.quantity)) {
                            value = value[gender][interpolation.quantity];
                        } else {
                            if (interpolation.quantity === 0) {
                                value = value[gender].zero;
                            } else {
                                value = value[gender].many;
                            }
                        }
                    } else {
                        throw new Error('Missing "quantity" property on the replacements!');
                    }
                }
            }
        }

        // Handle interpolation
        if ((interpolation || this.defaultReplacements) && value) {
            let replacements = Object.assign({}, interpolation, this.defaultReplacements);
            value = value.replace(/{([^}]*)}/gi, (m, param) => {
                let params = param.split(':');
                if (params.length === 1) {
                    let match = '';
                    if (replacements.hasOwnProperty(param)) {
                        match = replacements[param];
                    } else {
                        match = replacements;
                    }
                    return match;
                }
                let unparsedValue = replacements[params[0]] || interpolation;
                switch (params[1]) {
                    case 'date':
                        return this.formatDate(unparsedValue, params[2]);
                    case 'currency':
                        return this.formatCurrency(unparsedValue, params[2]);
                    case 'number':
                        return this.formatNumber(unparsedValue, params[2]);
                    case 'format':
                        let formats = params[2].split(',');
                        let formattedString = unparsedValue;
                        if (formats.length) {
                            for (let format of formats) {
                                formattedString = this.format(formattedString, format);
                            }
                        } else {
                            formattedString = this.format(unparsedValue, params[2]);
                        }
                        return formattedString;
                    default:
                        return '';
                }
            });
        }

        // Return the key if no value is present.
        return value || key;
    }

    public format(value: any, format?: string): string {
        return this.formats.format(value, format);
    }

    public formatDate(date: any, format?: string | Intl.DateTimeFormatOptions): string {
        return this.formats.formatDate(date, format);
    }

    public formatCurrency(value: any, format?: string | Intl.NumberFormatOptions): string {
        return this.formats.formatCurrency(value, format);
    }

    public formatNumber(value: any, format?: Intl.NumberFormatOptions): string {
        return this.formats.formatNumber(value, format);
    }

    private getValue(key: string): string | undefined {
        let value;
        let translations = this.dictionaryManager.get(this.currentLocale);

        if (translations) {
            let tokens = key.split('.');
            for (let i = 0; i < tokens.length; i++) {
                if (!value) {
                    value = translations[tokens[i]];
                } else {
                    value = value[tokens[i]];
                }
            }
        }
        return value;
    }

    private getTranslations(locale: string): Observable<any> {
        // Split out the language code from the locale
        let languageCode = (locale.split('-')[0] || '').toLowerCase();
        // Cue up two observables to grab the locale and the fallback locale
        // en-US - locale (en-US) / fallback (en)
        let translations = this.translationFetcher(locale);
        let fallbackTranslations = this.translationFetcher(languageCode);
        // Combine the two observables and share the same subscription
        this.pending = Observable.combineLatest(translations, fallbackTranslations).share();
        // Subscribe to the result
        this.pending.subscribe(result => {
            this.applyLanguage(locale, result[0], result[1]);
        }, err => {
            console.error('[Chomsky] - Fetching Translations Error:', err);
        }, () => {
            this.pending = undefined;
        });

        return this.pending;
    }

    private applyLanguage(locale: string, translations: any, fallbackTranslations: any): void {
        // Set current locale
        this.currentLocale = locale;
        // Set locale on formats too
        this.formats.setLocale(locale);
        // Handle overrides
        let overrides = {};
        if (translations && translations.hasOwnProperty('_defaults_')) {
            mergeDeep(overrides, translations._defaults_);
            delete translations['_defaults_'];
        }
        if (fallbackTranslations && fallbackTranslations.hasOwnProperty('_defaults_')) {
            mergeDeep(overrides, fallbackTranslations._defaults_);
            delete translations['_defaults_'];
        }
        this.formats.override(mergeDeep({}, FORMAT_DEFAULTS, overrides));
        // Add the translations to the DictionaryManager
        this.dictionaryManager.add(locale, translations, fallbackTranslations);
        // Emit a change event
        this.onLocaleChange.next(locale);
    }

    private translationFetcher(locale: string): Observable<string> {
        return this.loader.load(`${this.location}${locale}.json`);
    }
}
