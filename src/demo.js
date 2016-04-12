import {Chomsky} from './chomsky';

import enTranslationObject from './i18n/en.json';
import esTranslationObject from './i18n/es.json';

class Demo {
    constructor() {
        // Greeting
        this.chomsky = new Chomsky;

        this.chomsky.addTranslation('en', enTranslationObject);

        console.log(this.chomsky.translate('GREETING', {name: 'John'}));

        this.chomsky.setLanguage('es', esTranslationObject);

        console.log(this.chomsky.translate('GREETING', {name: 'John'}));

        // Goodbye
        this.chomsky.addTranslation('en', {GOODBYE: 'Goodbye, {name}.'});
        this.chomsky.addTranslation('es', {GOODBYE: 'Adios, {name}.'});

        console.log(this.chomsky.translate('GOODBYE', {name: 'John'}));
        this.chomsky.setLanguage('en');
        console.log(this.chomsky.translate('GOODBYE', {name: 'John'}));

        // Date
        this.chomsky.addTranslation('en', {TODAY: 'Today is, {today:date:MM[/]DD[/]YYYY}.'});
        this.chomsky.addTranslation('es', {TODAY: 'Hoy es, {today:date:DD[/]MM[/]YYYY}.'});
        console.log(this.chomsky.translate('TODAY', {today: new Date()}));
        this.chomsky.setLanguage('es');
        console.log(this.chomsky.translate('TODAY', {today: new Date()}));

        // $$
        this.chomsky.addTranslation('en', {MONEY: 'You owe: {debt:currency:$}'});
        this.chomsky.addTranslation('es', {MONEY: 'Se lo debe: {debt:currency:€}'});
        console.log(this.chomsky.translate('MONEY', {debt: 10000}));
        this.chomsky.setLanguage('en');
        console.log(this.chomsky.translate('MONEY', {debt: 10000}));
    }

}


let demo = new Demo;