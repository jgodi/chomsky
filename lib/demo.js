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

    // Greeting
    this.chomsky = new _chomsky.Chomsky();

    this.chomsky.setLanguage('en', _en2.default);

    console.log(this.chomsky.translate('GREETING', { name: 'John' }));

    this.chomsky.setLanguage('es', _es2.default);

    console.log(this.chomsky.translate('GREETING', { name: 'John' }));

    // Goodbye
    this.chomsky.addTranslation('en', { GOODBYE: 'Goodbye, {name}.' });
    this.chomsky.addTranslation('es', { GOODBYE: 'Adios, {name}.' });

    console.log(this.chomsky.translate('GOODBYE', { name: 'John' }));
    this.chomsky.setLanguage('en');
    console.log(this.chomsky.translate('GOODBYE', { name: 'John' }));

    // Date
    this.chomsky.addTranslation('en', { TODAY: 'Today is, {today:date:MM[/]DD[/]YYYY}.' });
    this.chomsky.addTranslation('es', { TODAY: 'Hoy es, {today:date:DD[/]MM[/]YYYY}.' });
    console.log(this.chomsky.translate('TODAY', { today: new Date() }));
    this.chomsky.setLanguage('es');
    console.log(this.chomsky.translate('TODAY', { today: new Date() }));

    // $$
    this.chomsky.addTranslation('en', { MONEY: 'You owe: {debt:currency:$}' });
    this.chomsky.addTranslation('es', { MONEY: 'Se lo debe: {debt:currency:€}' });
    console.log(this.chomsky.translate('MONEY', { debt: 10000 }));
    this.chomsky.setLanguage('en');
    console.log(this.chomsky.translate('MONEY', { debt: 10000 }));
};

var demo = new Demo();