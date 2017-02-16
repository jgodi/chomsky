import { test } from 'ava';
import { Formats } from './formats';
import { FORMAT_DEFAULTS } from './chomsky';

const SHORT_HAND_VALUES = {
    'en-US': {
        short: '12/4/1987, 12:00',
        medium: 'Dec 4, 1987, 12:00',
        long: 'December 4, 1987 at 12:00 ',
        dateShort: '12/4/1987',
        dateMedium: 'Dec 4, 1987',
        dateLong: 'December 4, 1987',
        timeShort: '12:00',
        timeLong: '12:00 '
    },
    'fr-FR': {
        short: '04/12/1987 00:00',
        medium: '4 déc. 1987 à 00:00',
        long: '4 décembre 1987 à 00:00 ',
        dateShort: '04/12/1987',
        dateMedium: '4 déc. 1987',
        dateLong: '4 décembre 1987',
        timeShort: '00:00',
        timeLong: '00:00 '
    }
};

test.before(() => {
    global.Intl = require('intl');
});

test.beforeEach(t => {
    t.context.formats = new Formats();
    // Provide the DEFAULT overrides
    t.context.formats.override(FORMAT_DEFAULTS);
});

// Method Checking

test('should have overrides defined', t => {
    t.truthy(t.context.formats.override);
});

test('should have setLocale defined', t => {
    t.truthy(t.context.formats.setLocale);
});

test('should have formatNumber defined', t => {
    t.truthy(t.context.formats.formatNumber);
});

test('should have formatCurrency defined', t => {
    t.truthy(t.context.formats.formatCurrency);
});

test('should have formatDate defined', t => {
    t.truthy(t.context.formats.formatDate);
});

test('should have format defined', t => {
    t.truthy(t.context.formats.format);
});

// override(overrides)

test('overrides should be set', t => {
    t.context.formats.override({ date: 'DATE' });
    t.deepEqual(t.context.formats.defaults, { date: 'DATE' });
});

test('overrides should set locale if overrides contain it and remove it before setting defaults', t => {
    let overrides = { locale: 'LOCALE', date: 'DATE' };
    t.context.formats.override(overrides);
    t.deepEqual(t.context.formats.defaults, { date: 'DATE' });
    t.is(t.context.formats.locale, 'LOCALE');
});

// format(value, format)

test('format should return the value if no value passed in', t => {
    t.falsy(t.context.formats.format(undefined));
});

test('format should return the value if no format matches', t => {
    t.is(t.context.formats.format('test', 'nope'), 'test');
});

test('format should uppercase', t => {
    t.is(t.context.formats.format('test', 'uppercase'), 'TEST');
});

test('format should lowercase', t => {
    t.is(t.context.formats.format('TEST', 'lowercase'), 'test');
});

test('format should title case', t => {
    t.is(t.context.formats.format('test test', 'title'), 'Test Test');
});

test('format should denormalize case', t => {
    t.is(t.context.formats.format('test test', 'denormalize'), 'Test test');
});

// setLocale(locale)

test('locale should be set correctly', t => {
    t.context.formats.setLocale('LOCALE');
    t.is(t.context.formats.locale, 'LOCALE');
});

// formatNumber(value, format)

test('formatNumber should default to en-US for unknown locale', t => {
    t.context.formats.setLocale('UNKNOWN');
    t.context.formats.override({});
    t.is(t.context.formats.formatNumber(10000), '10,000');
});

test('formatNumber should properly format with a known locale', t => {
    t.context.formats.setLocale('fr-FR');
    t.context.formats.override({});
    t.is(t.context.formats.formatNumber(10000), '10 000');
});

test('formatNumber should work with decimals', t => {
    t.context.formats.setLocale('en-US');
    t.context.formats.override({});
    t.is(t.context.formats.formatNumber(10000.02), '10,000.02');
});

test('formatNumber should chop off decimals ending in 00', t => {
    t.context.formats.setLocale('en-US');
    t.context.formats.override({});
    t.is(t.context.formats.formatNumber(10000.00), '10,000');
});

test('formatNumber should be able to pass a format', t => {
    t.context.formats.setLocale('en-US');
    t.context.formats.override({});
    t.is(t.context.formats.formatNumber(1, { style: 'percent' }), '100%');
});

test('formatNumber should work with overrides', t => {
    t.context.formats.setLocale('en-US');
    t.context.formats.override({ number: { style: 'percent' } });
    t.is(t.context.formats.formatNumber(1), '100%');
});

test('formatNumber should work with overrides and a format', t => {
    t.context.formats.setLocale('en-US');
    t.context.formats.override({ number: { style: 'decimal' } });
    t.is(t.context.formats.formatNumber(123456.789, { maximumSignificantDigits: 3 }), '123,000');
});

// formatCurrency(value, format)

test('formatCurrency should default to en-US for unknown locale', t => {
    t.context.formats.setLocale('UNKNOWN');
    t.context.formats.override({});
    t.is(t.context.formats.formatCurrency(10000), '$10,000.00');
});

test('formatCurrency should properly format with a known locale', t => {
    t.context.formats.setLocale('fr-FR');
    t.context.formats.override({ currency: { currency: 'EUR' } });
    t.is(t.context.formats.formatCurrency(10000), '10 000,00 €');
});

test('formatCurrency should work with decimals', t => {
    t.context.formats.setLocale('en-US');
    t.context.formats.override({});
    t.is(t.context.formats.formatCurrency(10000.02), '$10,000.02');
});

test('formatCurrency should be able to pass a format', t => {
    t.context.formats.setLocale('en-US');
    t.context.formats.override({});
    t.is(t.context.formats.formatCurrency(1, { currency: 'EUR' }), '€1.00');
});

test('formatCurrency should work with overrides', t => {
    t.context.formats.setLocale('en-US');
    t.context.formats.override({ currency: { currency: 'EUR' } });
    t.is(t.context.formats.formatCurrency(1), '€1.00');
});

test('currency should work with overrides and a format', t => {
    t.context.formats.setLocale('en-US');
    t.context.formats.override({ currency: { currency: 'EUR' } });
    t.is(t.context.formats.formatCurrency(123456.789, { maximumSignificantDigits: 3 }), '€123,000');
});

test('currency should be able to take a currency as the format', t => {
    t.context.formats.setLocale('en-US');
    t.context.formats.override({});
    t.is(t.context.formats.formatCurrency(123456.789, 'EUR'), '€123,456.79');
});

test('currency should use the override currency if set', t => {
    t.context.formats.setLocale('en-US');
    t.context.formats.overrideCurrency = 'RUB';
    t.is(t.context.formats.formatCurrency(123456.789), 'RUB123,456.79');
});

// formatDate(value, format)

test('formatDate should default to en-US for unknown locale', t => {
    t.context.formats.setLocale('UNKNOWN');
    t.is(t.context.formats.formatDate('12/04/1987'), '12/4/1987');
});

test('formatDate should format for a known locale', t => {
    t.context.formats.setLocale('fr-FR');
    t.is(t.context.formats.formatDate('12/04/1987'), '04/12/1987');
});

// Test all short hand formats
Object.keys(FORMAT_DEFAULTS.date).forEach(format => {
    test(`formatDate should format with the short hand "${format}"`, t => {
        t.context.formats.setLocale('en-US');
        t.is(t.context.formats.formatDate('12/04/1987', format), SHORT_HAND_VALUES['en-US'][format]);
        t.context.formats.setLocale('fr-FR');
        t.is(t.context.formats.formatDate('12/04/1987', format), SHORT_HAND_VALUES['fr-FR'][format]);
    });
});
