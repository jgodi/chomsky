import { Chomsky } from './chomsky-copied/index';

let chomsky = new Chomsky();

// Setup default replacements
let replacements = {
    'en-US': {
        one: 'ONE',
        two: 'two',
        three: 30000
    },
    'en-GB': {
        one: 'ONE',
        two: 'two',
        three: 30000
    },
    'fr-FR': {
        one: 'UN',
        two: 'deux',
        three: 30000
    }
};

// Setup locale change handler
chomsky.onLocaleChange.subscribe((locale: string) => {
    console.log(`[Language Change]: ${locale}`);
    chomsky.setDefaultReplacements(replacements[locale]);
    console.log('\t' + chomsky.translate('GREETING', { name: 'John' }));
    console.log('\t' + chomsky.translate('GOODBYE', { name: 'John' }));
    console.log('\t' + chomsky.translate('TODAY', { today: new Date() }));
    console.log('\t' + chomsky.translate('TOMORROW', { tomorrow: '7/4/1776' }));
    console.log('\t' + chomsky.translate('MONEY', { debt: 123456.1 }));
    console.log('\t' + chomsky.translate('NUMBER', { people: 0 }));
    console.log('\t' + chomsky.translate('NUMBER', { people: 1234567 }));
    console.log('\t' + chomsky.translate('MESSAGES', { quantity: 0 }));
    console.log('\t' + chomsky.translate('MESSAGES', { quantity: 1 }));
    console.log('\t' + chomsky.translate('MESSAGES', { quantity: 45 }));
    console.log('\t' + chomsky.formatCurrency(12345, 'USD'));
    console.log('\t' + chomsky.translate('FORMAT_TEST', { name: 'John' }));
    console.log('\t' + chomsky.translate('DEFAULTS_TEST'));
    console.log('\t' + chomsky.translate('DATE_SHORT', { value: new Date() }));
    console.log('\t' + chomsky.translate('DATE_MEDIUM', { value: new Date() }));
    console.log('\t' + chomsky.translate('DATE_LONG', { value: new Date() }));
    console.log('\t' + chomsky.translate('TIME_SHORT', { value: new Date() }));
    console.log('\t' + chomsky.translate('TIME_LONG', { value: new Date() }));
    console.log('\t' + chomsky.translate('SHORT', { value: new Date() }));
    console.log('\t' + chomsky.translate('MEDIUM', { value: new Date() }));
    console.log('\t' + chomsky.translate('LONG', { value: new Date() }));
    console.log('\t' + chomsky.translate('DATE_CUSTOM', { value: new Date() }));
});

// Locales
const US_LOCALE = 'en-US';
const FR_LOCALE = 'fr-FR';
const GB_LOCALE = 'en-GB';
const MISSING_LOCALE = 'en-NOPE';
const REALLY_MISSING = 'nope-NOPE';

// Swap Locales
chomsky.use(US_LOCALE);
chomsky.use(FR_LOCALE);
chomsky.use(MISSING_LOCALE);
chomsky.use(REALLY_MISSING);
chomsky.use(GB_LOCALE).subscribe(() => {
    // Load US again (should not fire XHR requests)
    chomsky.use(US_LOCALE);
});
