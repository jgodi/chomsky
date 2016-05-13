import { Chomsky } from './../src/chomsky';

class Demo {
    constructor() {
        this.chomsky = new Chomsky;
        const usLocale = 'en-US';
        //const ukLocale = 'en-GB';
        const frLocale = 'fr-FR';

	    // Greeting
	    Promise.all([
		    this.chomsky.setLanguage(usLocale, './i18n/en.json'),
		    this.chomsky.setLanguage(frLocale, './i18n/fr.json')
	    ]).then(() => {
		    console.log('GREETING');
		    console.log('\ten-US');
		    this.chomsky.setLanguage(usLocale);
		    console.log('\t\t' + this.chomsky.translate('GREETING', { name: 'John' }));
		    this.chomsky.setLanguage(frLocale);
		    console.log('\tfr-FR');
		    console.log('\t\t' + this.chomsky.translate('GREETING', { name: 'John' }));
	    });

        // Goodbye
        console.log('GOODBYE');
        this.chomsky.setLanguage(usLocale, { GOODBYE: 'Goodbye, {name}.' });
        this.chomsky.setLanguage(frLocale, { GOODBYE: 'Au Revoir, {name}.', formats: { currency: { display: '($ 0.00 a)' } } });
        console.log('\tfr-FR');
        console.log('\t\t' + this.chomsky.translate('GOODBYE', { name: 'John' }));
        this.chomsky.setLanguage(usLocale);
        console.log('\ten-US');
        console.log('\t\t' + this.chomsky.translate('GOODBYE', { name: 'John' }));

        // Date
        console.log('DATE');
        this.chomsky.setLanguage(usLocale, { TODAY: 'Today is {today:date:MM[/]DD[/]YYYY}.' });
	    console.log('\ten-US');
	    console.log('\t\t' + this.chomsky.translate('TODAY', { today: new Date() }));
	    this.chomsky.setLanguage(frLocale, { TODAY: 'Aujourd\'hui est {today:date:DD[/]MM[/]YYYY}.' });
	    console.log('\tfr-FR');
        console.log('\t\t' + this.chomsky.translate('TODAY', { today: new Date() }));

	    // Date string
	    console.log('DATE STRING');
	    this.chomsky.setLanguage(usLocale, { TOMORROW: 'Today is {today:date::MM-DD-YYYY}.' });
	    console.log('\ten-US');
	    console.log('\t\t' + this.chomsky.translate('TOMORROW', { today: '7/4/1776' }));
	    this.chomsky.setLanguage(frLocale, { TOMORROW: 'Aujourd\'hui est {today:date::DD-MM-YYYY}.' });
	    console.log('\tfr-FR');
	    console.log('\t\t' + this.chomsky.translate('TOMORROW', { today: '4/7/1776' }));

        // $$
        console.log('MONEY');
        this.chomsky.setLanguage('en', { MONEY: 'You owe: {debt:currency}' });
        this.chomsky.setLanguage(frLocale, { MONEY: 'Vous devez: {debt:currency}' });
        console.log('\tfr-FR');
        console.log('\t\t' + this.chomsky.translate('MONEY', { debt: 123456.1 }));
        this.chomsky.setLanguage(usLocale);
        console.log('\ten-US');
        console.log('\t\t' + this.chomsky.translate('MONEY', { debt: 123456.1 }));

	    // Number
	    console.log('NUMBER');
	    this.chomsky.setLanguage(usLocale, { num: 'There are {people:number:0,0.0000} things' });
	    this.chomsky.setLanguage(frLocale, { num: 'Il y a {people:number:0,0.0000} choses' });
	    console.log('\tfr-FR');
	    console.log('\t\t' + this.chomsky.translate('num', { people: 1234567 }));
	    this.chomsky.setLanguage(usLocale);
	    console.log('\ten-US');
	    console.log('\t\t' + this.chomsky.translate('num', { people: 1234567 }));


	    // Pluralization
	    console.log('PLURALIZATION');
	    this.chomsky.setLanguage(usLocale, { messages: {
		    zero: 'No messages.',
		    1: 'Only 1 message',
		    many: 'A lot of messages.'
	    }});
	    console.log('\ten-US');
	    console.log('\t\t' + this.chomsky.translate('messages', 0));
	    console.log('\t\t' + this.chomsky.translate('messages', 1));
	    console.log('\t\t' + this.chomsky.translate('messages', 45));
	    this.chomsky.setLanguage(frLocale, { messages: {
		    zero: 'Pas de messages.',
		    1: 'Seulement 1 message',
		    many: 'Un grand nombre de messages.'
	    }});
	    console.log('\tfr-FR');
	    console.log('\t\t' + this.chomsky.translate('messages', 0));
	    console.log('\t\t' + this.chomsky.translate('messages', 1));
	    console.log('\t\t' + this.chomsky.translate('messages', 45));
    }
}
let demo = new Demo;