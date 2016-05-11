import { Chomsky } from './../src/chomsky';

class Demo {
    constructor() {
        this.chomsky = new Chomsky;

        let usLocale = 'en-US';
        //let ukLocale = 'en-GB';
        let frLocale = 'fr-FR';

	    // Greeting
	    this.chomsky.setLanguage(usLocale, './i18n/en.json').then(() => {
		    console.log('GREETING');
		    console.log('\ten-US');
		    console.log('\t\t' + this.chomsky.translate('GREETING', { name: 'John' }));
	    });
	    this.chomsky.setLanguage(frLocale, './i18n/fr.json').then(() => {
		    console.log('\tfr-FR');
		    console.log('\t\t' + this.chomsky.translate('GREETING', { name: 'John' }));
	    });


        // Goodbye
        console.log('GOODBYE');
        this.chomsky.setLanguage(usLocale, { GOODBYE: 'Goodbye, {name}.' });
        this.chomsky.setLanguage(frLocale, { GOODBYE: 'Au Revoir, {name}.' });
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

        // $$
        console.log('MONEY');
        this.chomsky.setLanguage(usLocale, { MONEY: 'You owe: {debt:currency:USD}' });
        this.chomsky.setLanguage(frLocale, { MONEY: 'Vous devez: {debt:currency:EUR}' });
        console.log('\tfr-FR');
        console.log('\t\t' + this.chomsky.translate('MONEY', { debt: 10000 }));
        this.chomsky.setLanguage(usLocale);
        console.log('\ten-US');
        console.log('\t\t' + this.chomsky.translate('MONEY', { debt: 10000 }));
    }

}
let demo = new Demo;