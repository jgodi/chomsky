import { Chomsky } from './../src/chomsky';

import enTranslationObject from './i18n/en.json';
import esTranslationObject from './i18n/es.json';

class Demo {
    constructor() {
        let usLocale = 'en-US';
        let frLocale = 'fr-FR';

        // Greeting
        this.chomsky = new Chomsky;

        this.chomsky.setLanguage(usLocale, enTranslationObject);

        console.log(this.chomsky.translate('GREETING', { name: 'John' }));

        this.chomsky.setLanguage(frLocale, esTranslationObject);

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
    }

}
let demo = new Demo;