import { test } from 'ava';
import { Formats } from './formats';

test.before(() => {
    global.Intl = require('intl');
});

test.beforeEach(t => {
    t.context.formats = new Formats();
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
