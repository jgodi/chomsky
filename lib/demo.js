'use strict';

var _chomsky = require('./chomsky');

var _en = require('./i18n/en.json');

var _en2 = _interopRequireDefault(_en);

var _es = require('./i18n/es.json');

var _es2 = _interopRequireDefault(_es);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Demo = function Demo() {
    _classCallCheck(this, Demo);

    var usLocale = 'en-US';
    var frLocale = 'fr-FR';

    // Greeting
    this.chomsky = new _chomsky.Chomsky();

    this.chomsky.setLanguage(usLocale, _en2.default);

    console.log(this.chomsky.translate('GREETING', { name: 'John' }));

    this.chomsky.setLanguage(frLocale, _es2.default);

    console.log(this.chomsky.translate('GREETING', { name: 'John' }));

    // Goodbye
    this.chomsky.addTranslation(usLocale, { GOODBYE: 'Goodbye, {name}.' });
    this.chomsky.addTranslation(frLocale, { GOODBYE: 'Au Revoir, {name}.' });

    console.log(this.chomsky.translate('GOODBYE', { name: 'John' }));
    this.chomsky.setLanguage(usLocale);
    console.log(this.chomsky.translate('GOODBYE', { name: 'John' }));

    // Date
    this.chomsky.addTranslation(usLocale, { TODAY: 'Today is {today:date:MM[/]DD[/]YYYY}.' });
    this.chomsky.addTranslation(frLocale, { TODAY: 'Aujourd\'hui est {today:date:DD[/]MM[/]YYYY}.' });
    console.log(this.chomsky.translate('TODAY', { today: new Date() }));
    this.chomsky.setLanguage(frLocale);
    console.log(this.chomsky.translate('TODAY', { today: new Date() }));

    // $$
    this.chomsky.addTranslation(usLocale, { MONEY: 'You owe: {debt:currency:USD}' });
    this.chomsky.addTranslation(frLocale, { MONEY: 'Vous devez: {debt:currency:EUR}' });
    console.log(this.chomsky.translate('MONEY', { debt: 10000 }));
    this.chomsky.setLanguage(usLocale);
    console.log(this.chomsky.translate('MONEY', { debt: 10000 }));
};

var demo = new Demo();