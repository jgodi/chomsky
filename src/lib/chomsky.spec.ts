import { test } from 'ava';
const sinon = require('sinon');
import { Observable } from 'rxjs/Observable';
import { Chomsky, FORMAT_DEFAULTS } from './chomsky';

let FR_TRANSLATIONS = {
    greeting: 'Bonjour',
    farewell: 'Au revoir, {name}.',
    birthday: 'Joyeux anniversaire est, {dob:date}.',
    reminder: 'Votre réunion est {meeting:date:ddd}.',
    placements: 'Vous avez besoin {placed:number:0,0.0000}.',
    messages: {
        other: {
            zero: 'Pas de messages.',
            '1': 'Seulement 1 message',
            many: '{quantity} messages.'
        }
    },
    candidate: {
        male: {
            zero: '{host} n\'a pas de {candidate} et il est triste.',
            '1': '{host} a un {candidate} et il est excité.',
            many: '{host} a des {candidate} et il est extatique.'
        },
        female: {
            zero: '{host} n\'a pas de {candidate} et elle est triste.',
            '1': '{host} a un {candidate} et elle est excité.',
            many: '{host} a des {candidate} et elle est extatique.'
        },
        other: {
            zero: '{host} ont pas de {candidate} et ils sont tristes.',
            '1': '{host} ont un {candidate} et ils sont excités.',
            many: '{host} ont des {candidate} et ils sont ravis.'
        }
    },
    upperGreet: 'Bonjour {name:format:uppercase}',
    lowerGreet: 'Bonjour {name:format:lowercase}',
    titleGreet: 'Bonjour {name:format:title}',
    denormCap: 'Bonjour {name:format:denormalize,uppercase}'
};

let US_TRANSLATIONS = {
    greeting: 'Hello',
    farewell: 'Goodbye, {name}.',
    birthday: 'Happy birthday is, {dob:date}.',
    reminder: 'Your meeting is on {meeting:date:ddd}.',
    placements: 'You need {placed:number:0,0.0000}.',
    messages: {
        other: {
            zero: 'No messages.',
            1: 'Only 1 message',
            many: '{quantity} messages.'
        }
    },
    candidate: {
        male: {
            zero: '{host} has no {candidate} and he is sad.',
            '1': '{host} has one {candidate} and he is excited.',
            many: '{host} has some {candidate} and he\'s ecstatic.'
        },
        female: {
            zero: '{host} has no {candidate} and she is sad.',
            '1': '{host} has one {candidate} and she is excited.',
            many: '{host} has some {candidate} and she\'s ecstatic.'
        },
        other: {
            zero: '{host} have no {candidate} and they are sad.',
            '1': '{host} have one {candidate} and they are excited.',
            many: '{host} have some {candidate} and they are ecstatic.'
        }
    },
    upperGreet: 'Hello {name:format:uppercase}',
    lowerGreet: 'Hello {name:format:lowercase}',
    titleGreet: 'Hello {name:format:title}',
    denormCap: 'Hello {name:format:denormalize,uppercase}'
};

test.before(() => {
    global.Intl = require('intl');
});

test.beforeEach(t => {
    t.context.chomsky = new Chomsky();
    t.context.chomsky.dictionaryManager.add('fr', FR_TRANSLATIONS);
    t.context.chomsky.dictionaryManager.add('en', US_TRANSLATIONS);
    sinon.stub(t.context.chomsky, 'getTranslations', () => { return Observable.of({ KEY: 'value' }); });
    sinon.stub(t.context.chomsky.loader, 'load', () => { return Observable.of({ KEY: 'value' }); });
});

// setLocation(location)

test('setLocation should set the location', t => {
    t.context.chomsky.setLocation('LOCATION');
    t.is(t.context.chomsky.location, 'LOCATION');
});

// setDefaultReplacements(replacements);

test('setDefaultReplacements should set the replacements', t => {
    t.context.chomsky.setDefaultReplacements('REPLACEMENTS');
    t.is(t.context.chomsky.defaultReplacements, 'REPLACEMENTS');
});

// use(locale)

test('use should properly load translations if dictionary is empty', t => {
    t.context.chomsky.use('bh-BH').subscribe(translations => {
        t.deepEqual(translations, { KEY: 'value' });
    });
});

test('use should properly load translations if dictionary has values', t => {
    t.context.chomsky.dictionaryManager.add('bh-BH', { KEY: 'value' });
    t.context.chomsky.dictionaryManager.add('bh', { FALLBACK: 'value' });
    t.context.chomsky.use('bh-BH').subscribe(translations => {
        t.deepEqual(translations, [{ KEY: 'value' }, { FALLBACK: 'value' }]);
    });
});

// overrideCurrency(currency)

test('overrideCurrency should set the override on the formats', t => {
    t.context.chomsky.overrideCurrency('RUB');
    t.is(t.context.chomsky.formats.overrideCurrency, 'RUB');
});

// getValue(key)

test('getValue should return the value for the key', t => {
    t.context.chomsky.currentLocale = 'bh-BH';
    t.context.chomsky.dictionaryManager.add('bh-BH', { KEY: 'value' });
    t.is(t.context.chomsky.getValue('KEY'), 'value');
});

test('getValue should return undefined for an unknown key', t => {
    t.context.chomsky.currentLocale = 'bh-BH';
    t.context.chomsky.dictionaryManager.add('bh-BH', { KEY: 'value' });
    t.is(t.context.chomsky.getValue('UNKNOWN'), undefined);
});

test('getValue should return the value for an embedded key', t => {
    t.context.chomsky.currentLocale = 'bh-BH';
    t.context.chomsky.dictionaryManager.add('bh-BH', { KEY: { ANOTHER: 'value' } });
    t.is(t.context.chomsky.getValue('KEY.ANOTHER'), 'value');
});

test('getValue should return the undefined for an unknown locale', t => {
    t.context.chomsky.currentLocale = 'UNKNOWN';
    t.is(t.context.chomsky.getValue('KEY.ANOTHER'), undefined);
});

// translationFetcher(locale)

test('translationFetcher should return translations', t => {
    t.context.chomsky.translationFetcher('bh-BH').subscribe(translations => {
        t.deepEqual(translations, { KEY: 'value' });
    });
});

// format(value, format) -- mainly tested in formats.spec.ts

test('format should work', t => {
    t.is(t.context.chomsky.format('test', 'uppercase'), 'TEST');
});

// formatDate(value, format) -- mainly tested in formats.spec.ts

test('formatDate should work', t => {
    t.context.chomsky.formats.override(FORMAT_DEFAULTS);
    t.is(t.context.chomsky.formatDate('12/04/1987'), '12/4/1987');
});

// formatCurrency(value, format) -- mainly tested in formats.spec.ts

test('formatCurrency should work', t => {
    t.context.chomsky.formats.override(FORMAT_DEFAULTS);
    t.is(t.context.chomsky.formatCurrency('1000'), '$1,000.00');
});

// formatNumber(value, format) -- mainly tested in formats.spec.ts

test('formatNumber should work', t => {
    t.context.chomsky.formats.override(FORMAT_DEFAULTS);
    t.is(t.context.chomsky.formatNumber('1000'), '1,000');
});

// translate(key, interpolation)

test('translate should return', t => {
    t.context.chomsky.currentLocale = 'en';
    t.is(t.context.chomsky.translate('greeting'), 'Hello');
    t.context.chomsky.currentLocale = 'fr';
    t.is(t.context.chomsky.translate('greeting'), 'Bonjour');
});

test('translate should fail over from the local into the language', t => {
    t.context.chomsky.currentLocale = 'en-US';
    t.is(t.context.chomsky.translate('greeting'), 'Hello');
    t.context.chomsky.currentLocale = 'fr-FR';
    t.is(t.context.chomsky.translate('greeting'), 'Bonjour');
});

test('translate should return the key if no translation found', t => {
    t.context.chomsky.currentLocale = 'en';
    t.is(t.context.chomsky.translate('NOPE'), 'NOPE');
    t.context.chomsky.currentLocale = 'fr';
    t.is(t.context.chomsky.translate('NOPE'), 'NOPE');
});

test('translate should resolve dynamic variables inside of strings', t => {
    let mockDynamicValues = { name: 'Mary' };
    t.context.chomsky.currentLocale = 'en';
    t.is(t.context.chomsky.translate('farewell', mockDynamicValues), 'Goodbye, Mary.');
    t.context.chomsky.currentLocale = 'fr';
    t.is(t.context.chomsky.translate('farewell', mockDynamicValues), 'Au revoir, Mary.');
});

test('translate should resolve dynamic date variables inside of strings', t => {
    let mockDynamicValues = { dob: '12/04/1987' };
    t.context.chomsky.formats.override(FORMAT_DEFAULTS);
    t.context.chomsky.currentLocale = 'en';
    t.is(t.context.chomsky.translate('birthday', mockDynamicValues), 'Happy birthday is, 12/4/1987.');
    t.context.chomsky.currentLocale = 'fr';
    t.is(t.context.chomsky.translate('birthday', mockDynamicValues), 'Joyeux anniversaire est, 12/4/1987.');
});

test('translate should resolve dynamic date variables with custom formatting inside of strings', t => {
    let mockDynamicValues = { meeting: '12/04/1987' };
    t.context.chomsky.formats.override(FORMAT_DEFAULTS);
    t.context.chomsky.currentLocale = 'en';
    t.is(t.context.chomsky.translate('reminder', mockDynamicValues), 'Your meeting is on 12/4/1987.');
    t.context.chomsky.currentLocale = 'fr';
    t.is(t.context.chomsky.translate('reminder', mockDynamicValues), 'Votre réunion est 12/4/1987.');
});

test('translate should resolve dynamic number variables with custom formatting inside of strings', t => {
    let mockDynamicValues = { placed: 123456.23 };
    t.context.chomsky.formats.override(FORMAT_DEFAULTS);
    t.context.chomsky.currentLocale = 'en';
    t.is(t.context.chomsky.translate('placements', mockDynamicValues), 'You need 123,456.23.');
    t.context.chomsky.currentLocale = 'fr';
    t.is(t.context.chomsky.translate('placements', mockDynamicValues), 'Vous avez besoin 123,456.23.');
});

test('translate should resolve plural values', t => {
    t.context.chomsky.currentLocale = 'en';
    t.is(t.context.chomsky.translate('messages', { quantity: 0 }), 'No messages.');
    t.is(t.context.chomsky.translate('messages', { quantity: 1 }), 'Only 1 message');
    t.is(t.context.chomsky.translate('messages', { quantity: 50 }), '50 messages.');
    t.context.chomsky.currentLocale = 'fr';
    t.is(t.context.chomsky.translate('messages', { quantity: 0 }), 'Pas de messages.');
    t.is(t.context.chomsky.translate('messages', { quantity: 1 }), 'Seulement 1 message');
    t.is(t.context.chomsky.translate('messages', { quantity: 50 }), '50 messages.');
});

test('translate should resolve plural values with male dynamic labels', t => {
    t.context.chomsky.currentLocale = 'en';
    let enPluralLabelPackage = {
        gender: 'male',
        quantity: 0,
        host: 'John',
        candidate: 'candidates'
    };
    t.is(t.context.chomsky.translate('candidate', enPluralLabelPackage), 'John has no candidates and he is sad.');
    enPluralLabelPackage.quantity = 1;
    enPluralLabelPackage.candidate = 'candidate';
    t.is(t.context.chomsky.translate('candidate', enPluralLabelPackage), 'John has one candidate and he is excited.');
    enPluralLabelPackage.quantity = 50;
    enPluralLabelPackage.candidate = 'candidates';
    t.is(t.context.chomsky.translate('candidate', enPluralLabelPackage), 'John has some candidates and he\'s ecstatic.');
    t.context.chomsky.currentLocale = 'fr';
    let frPluralLabelPackage = {
        gender: 'male',
        quantity: 0,
        host: 'John',
        candidate: 'candidats'
    };
    t.is(t.context.chomsky.translate('candidate', frPluralLabelPackage), 'John n\'a pas de candidats et il est triste.');
    frPluralLabelPackage.quantity = 1;
    frPluralLabelPackage.candidate = 'candidat';
    t.is(t.context.chomsky.translate('candidate', frPluralLabelPackage), 'John a un candidat et il est excité.');
    frPluralLabelPackage.quantity = 50;
    frPluralLabelPackage.candidate = 'candidats';
    t.is(t.context.chomsky.translate('candidate', frPluralLabelPackage), 'John a des candidats et il est extatique.');
});

test('translate should resolve plural values with female dynamic labels', t => {
    t.context.chomsky.currentLocale = 'en';
    let enPluralLabelPackage = {
        gender: 'female',
        quantity: 0,
        host: 'Jen',
        candidate: 'candidates'
    };
    t.is(t.context.chomsky.translate('candidate', enPluralLabelPackage), 'Jen has no candidates and she is sad.');
    enPluralLabelPackage.quantity = 1;
    enPluralLabelPackage.candidate = 'candidate';
    t.is(t.context.chomsky.translate('candidate', enPluralLabelPackage), 'Jen has one candidate and she is excited.');
    enPluralLabelPackage.quantity = 50;
    enPluralLabelPackage.candidate = 'candidates';
    t.is(t.context.chomsky.translate('candidate', enPluralLabelPackage), 'Jen has some candidates and she\'s ecstatic.');
    t.context.chomsky.currentLocale = 'fr';
    let frPluralLabelPackage = {
        gender: 'female',
        quantity: 0,
        host: 'Jen',
        candidate: 'candidats'
    };
    t.is(t.context.chomsky.translate('candidate', frPluralLabelPackage), 'Jen n\'a pas de candidats et elle est triste.');
    frPluralLabelPackage.quantity = 1;
    frPluralLabelPackage.candidate = 'candidat';
    t.is(t.context.chomsky.translate('candidate', frPluralLabelPackage), 'Jen a un candidat et elle est excité.');
    frPluralLabelPackage.quantity = 50;
    frPluralLabelPackage.candidate = 'candidats';
    t.is(t.context.chomsky.translate('candidate', frPluralLabelPackage), 'Jen a des candidats et elle est extatique.');
});

test('translate should resolve plural values with other dynamic labels', t => {
    t.context.chomsky.currentLocale = 'en';
    let enPluralLabelPackage = {
        gender: 'other',
        quantity: 0,
        host: 'The people',
        candidate: 'candidates'
    };
    t.is(t.context.chomsky.translate('candidate', enPluralLabelPackage), 'The people have no candidates and they are sad.');
    enPluralLabelPackage.quantity = 1;
    enPluralLabelPackage.candidate = 'candidate';
    t.is(t.context.chomsky.translate('candidate', enPluralLabelPackage), 'The people have one candidate and they are excited.');
    enPluralLabelPackage.quantity = 50;
    enPluralLabelPackage.candidate = 'candidates';
    t.is(t.context.chomsky.translate('candidate', enPluralLabelPackage), 'The people have some candidates and they are ecstatic.');
    t.context.chomsky.currentLocale = 'fr';
    let frPluralLabelPackage = {
        gender: 'other',
        quantity: 0,
        host: 'Les gens',
        candidate: 'candidats'
    };
    t.is(t.context.chomsky.translate('candidate', frPluralLabelPackage), 'Les gens ont pas de candidats et ils sont tristes.');
    frPluralLabelPackage.quantity = 1;
    frPluralLabelPackage.candidate = 'candidat';
    t.is(t.context.chomsky.translate('candidate', frPluralLabelPackage), 'Les gens ont un candidat et ils sont excités.');
    frPluralLabelPackage.quantity = 50;
    frPluralLabelPackage.candidate = 'candidats';
    t.is(t.context.chomsky.translate('candidate', frPluralLabelPackage), 'Les gens ont des candidats et ils sont ravis.');
});

test('translate should format an interpolated string', t => {
    t.context.chomsky.currentLocale = 'en';
    t.is(t.context.chomsky.translate('upperGreet', { name: 'Jane' }), 'Hello JANE');
    t.is(t.context.chomsky.translate('lowerGreet', { name: 'Jane' }), 'Hello jane');
    t.is(t.context.chomsky.translate('titleGreet', { name: 'The people' }), 'Hello The People');
    t.context.chomsky.currentLocale = 'fr';
    t.is(t.context.chomsky.translate('upperGreet', { name: 'Jane' }), 'Bonjour JANE');
    t.is(t.context.chomsky.translate('lowerGreet', { name: 'Jane' }), 'Bonjour jane');
    t.is(t.context.chomsky.translate('titleGreet', { name: 'Les gens' }), 'Bonjour Les Gens');
});

test('translate should combine formats an interpolated string', t => {
    t.context.chomsky.currentLocale = 'en';
    t.is(t.context.chomsky.translate('denormCap', { name: 'janeDoe' }), 'Hello JANE DOE');
    t.context.chomsky.currentLocale = 'fr';
    t.is(t.context.chomsky.translate('denormCap', { name: 'janeDoe' }), 'Bonjour JANE DOE');
});
