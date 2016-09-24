import { Chomsky } from './chomsky';

describe('Class: Chomsky', () => {
    it('should initialize with all it\'s defaults.', () => {
        let instance = new Chomsky();
        expect(instance).toBeDefined();
        expect(instance.dictionaryManager).toBeDefined();
        expect(instance.asyncLoader).toBeDefined();
        expect(instance.onLocaleChange).toBeDefined();
        expect(instance.currentLocale).toBe('en-US');
        expect(instance.formats).toBeDefined();
    });

    it('should initialize with a predefined locale (if provided).', () => {
        let instance = new Chomsky;
        expect(instance).toBeDefined();
        expect(instance.dictionaryManager).toBeDefined();
        expect(instance.asyncLoader).toBeDefined();
        expect(instance.onLocaleChange).toBeDefined();
        expect(instance.formats).toBeDefined();
    });

    describe('Function: _translationFetcher(locale)', () => {
        let chomsky;
        beforeEach(() => {
            chomsky = new Chomsky;
        });
        it('should call the load method of the AsyncLoader.', () => {
            expect(chomsky._translationFetcher).toBeDefined();
            spyOn(chomsky.asyncLoader, 'load').and.callFake(() => {
            });
            chomsky._translationFetcher('url');
            expect(chomsky.asyncLoader.load).toHaveBeenCalledWith('i18n/url.json');
            expect(chomsky.asyncLoader.load).toHaveBeenCalledTimes(1);
        });
        it('should call the load method of the AsynLoader (location changed)', () => {
            expect(chomsky._translationFetcher).toBeDefined();
            spyOn(chomsky.asyncLoader, 'load').and.callFake(() => {
            });
            chomsky.setLocation('test/');
            chomsky._translationFetcher('url');
            expect(chomsky.asyncLoader.load).toHaveBeenCalledWith('test/url.json');
            expect(chomsky.asyncLoader.load).toHaveBeenCalledTimes(1);
        });
    });

    xdescribe('Function: use(locale)', () => {
        let chomsky;
        beforeEach(() => {
            chomsky = new Chomsky;
        });
        it('should be defined.', done => {
            expect(chomsky.setLanguage).toBeDefined();
            done();
        });

        it('should set the current locale.', done => {
            let locale = 'en-US';
            spyOn(chomsky.formats, 'setLocale').and.callFake(() => {
            });
            chomsky.setLanguage(locale);
            expect(chomsky.currentLocale).toBe(locale);
            expect(chomsky.formats.setLocale).toHaveBeenCalledWith(locale);
            done();
        });

        it('should set the current locale and apply a language.', done => {
            let locale = 'en-US';
            let language = { greeting: 'Hello' };
            spyOn(chomsky.formats, 'setLocale').and.callFake(() => {
            });
            spyOn(chomsky, 'applyLanguage').and.callFake(() => {
            });
            chomsky.setLanguage(locale, language);
            expect(chomsky.currentLocale).toBe(locale);
            expect(chomsky.formats.setLocale).toHaveBeenCalledWith(locale);
            expect(chomsky.applyLanguage).toHaveBeenCalledWith(locale, language);
            done();
        });
    });

    describe('Function: _applyLanguage(language, translationObject)', () => {
        let chomsky;
        beforeEach(() => {
            chomsky = new Chomsky;
        });
        it('should be defined.', () => {
            expect(chomsky._applyLanguage).toBeDefined();
        });
    });

    describe('Function: _getTranslations(locale)', () => {
        let chomsky;
        beforeEach(() => {
            chomsky = new Chomsky;
        });
        it('should be defined.', () => {
            expect(chomsky._getTranslations).toBeDefined();
        });
    });

    describe('Function: _getValue(key)', () => {
        let chomsky;
        beforeEach(() => {
            chomsky = new Chomsky();
            chomsky.dictionaryManager.dictionaries['en-US'] = {
                greeting: 'Hello',
                menu: {
                    title: 'The Menu',
                    button: {
                        label: 'Click Here.',
                        alt: {
                            desc: 'Tool tip'
                        }
                    }
                },
                farewell: 'Goodbye'
            };
        });
        it('should be defined.', () => {
            expect(chomsky._getValue).toBeDefined();
        });

        it('should return a value from the dictionary.', () => {
            expect(chomsky._getValue).toBeDefined();
            expect(chomsky._getValue('greeting')).toBe('Hello');
        });

        it('should return a nested value from the dictionary.', () => {
            expect(chomsky._getValue).toBeDefined();
            expect(chomsky._getValue('menu.title')).toBe('The Menu');
            expect(chomsky._getValue('menu.button.label')).toBe('Click Here.');
            expect(chomsky._getValue('menu.button.alt.desc')).toBe('Tool tip');
        });

        it('should return a nested value from the locale dictionary.', () => {
            expect(chomsky._getValue).toBeDefined();
            expect(chomsky._getValue('farewell')).toBe('Goodbye');
        });
    });

    describe('Function: translate(key, interpolation, pluralValue)', () => {
        let chomsky;
        let key = 'greeting';

        beforeEach(() => {
            chomsky = new Chomsky;
            let frenchTranslation = {
                greeting: 'Bonjour',
                farewell: 'Au revoir, {name}.',
                birthday: 'Joyeux anniversaire est, {dob:date}.',
                reminder: 'Votre réunion est {meeting:date:ddd}.',
                placements: 'Vous avez besoin {placed:number:0,0.0000}.',
                messages: {
                    zero: 'Pas de messages.',
                    1: 'Seulement 1 message',
                    many: '{messages} messages.'
                },
                candidate: {
                    male: {
                        zero: '{host} n\'a pas de {candidate} et il est triste.',
                        1: '{host} a un {candidate} et il est excité.',
                        many: '{host} a des {candidate} et il est extatique.'
                    },
                    female: {
                        zero: '{host} n\'a pas de {candidate} et elle est triste.',
                        1: '{host} a un {candidate} et elle est excité.',
                        many: '{host} a des {candidate} et elle est extatique.'
                    },
                    other: {
                        zero: '{host} ont pas de {candidate} et ils sont tristes.',
                        1: '{host} ont un {candidate} et ils sont excités.',
                        many: '{host} ont des {candidate} et ils sont ravis.'
                    }
                }
            };
            let usTranslation = {
                greeting: 'Hello',
                farewell: 'Goodbye, {name}.',
                birthday: 'Happy birthday is, {dob:date}.',
                reminder: 'Your meeting is on {meeting:date:ddd}.',
                placements: 'You need {placed:number:0,0.0000}.',
                messages: {
                    zero: 'No messages.',
                    1: 'Only 1 message',
                    many: '{messages} messages.'
                },
                candidate: {
                    male: {
                        zero: '{host} has no {candidate} and he is sad.',
                        1: '{host} has one {candidate} and he is excited.',
                        many: '{host} has some {candidate} and he\'s ecstatic.'
                    },
                    female: {
                        zero: '{host} has no {candidate} and she is sad.',
                        1: '{host} has one {candidate} and she is excited.',
                        many: '{host} has some {candidate} and she\'s ecstatic.'
                    },
                    other: {
                        zero: '{host} have no {candidate} and they are sad.',
                        1: '{host} have one {candidate} and they are excited.',
                        many: '{host} have some {candidate} and they are ecstatic.'
                    }
                }
            };
            chomsky.dictionaryManager.add('fr', frenchTranslation);
            chomsky.dictionaryManager.add('en', usTranslation);
        });

        it('should translate a string.', () => {
            expect(chomsky.translate).toBeDefined();
            chomsky.use('en');
            expect(chomsky.translate(key)).toBe('Hello');
            chomsky.use('fr');
            expect(chomsky.translate(key)).toBe('Bonjour');
        });

        it('should fail-over from the local into the language.', () => {
            expect(chomsky.translate).toBeDefined();
            chomsky.use('fr-FR');
            expect(chomsky.translate(key)).toBe('Bonjour');
            chomsky.use('en-US');
            expect(chomsky.translate(key)).toBe('Hello');
        });

        it('should return the key when the translation is not available.', () => {
            expect(chomsky.translate).toBeDefined();
            chomsky.use('fr');
            expect(chomsky.translate(`${key}_`)).toBe('greeting_');
            chomsky.use('en');
            expect(chomsky.translate(`${key}_`)).toBe('greeting_');
        });

        it('should resolve dynamic variables inside of strings.', () => {
            expect(chomsky.translate).toBeDefined();
            chomsky.use('fr');
            let mockDynamicValues = { name: 'Mary' };
            expect(chomsky.translate('farewell', mockDynamicValues)).toBe('Au revoir, Mary.');
            chomsky.use('en');
            expect(chomsky.translate('farewell', mockDynamicValues)).toBe('Goodbye, Mary.');
        });

        it('should resolve dynamic date variables inside of strings.', () => {
            expect(chomsky.translate).toBeDefined();
            chomsky.use('fr');
            let mockDynamicValues = { dob: new Date(1776, 6, 4) };
            // French
            let frenchTranslation = chomsky.translate('birthday', mockDynamicValues);
            let frenchDate = frenchTranslation.split(',')[1].split('/');
            expect(frenchTranslation).toContain('Joyeux anniversaire est,');
            expect(frenchDate.length).toBe(3);
            expect(frenchDate[0]).toContain('4');
            expect(frenchDate[1]).toContain('7');
            expect(frenchDate[2]).toContain('1776');
            // English
            chomsky.use('en');
            let englishTranslation = chomsky.translate('birthday', mockDynamicValues);
            let englishDate = englishTranslation.split(',')[1].split('/');
            expect(englishTranslation).toContain('Happy birthday is');
            expect(englishDate.length).toBe(3);
            expect(englishDate[0]).toContain('7');
            expect(englishDate[1]).toContain('4');
            expect(englishDate[2]).toContain('1776');
        });

        it('should resolve dynamic date variables with custom formatting inside of strings.', () => {
            expect(chomsky.translate).toBeDefined();
            chomsky.use('fr');
            let mockDynamicValues = { meeting: new Date(1776, 6, 4) };
            // French
            let frenchTranslation = chomsky.translate('reminder', mockDynamicValues);
            let frenchDate = frenchTranslation.split('on ')[1];
            expect(frenchTranslation).toContain('Votre réunion est');
            expect(frenchDate.toLowerCase()).toContain('jeu');
            // English
            chomsky.use('en');
            let englishTranslation = chomsky.translate('reminder', mockDynamicValues);
            let englishDate = englishTranslation.split('on ')[1];
            expect(englishTranslation).toContain('Your meeting is on');
            expect(englishDate.toLowerCase()).toContain('thu');
        });

        it('should resolve dynamic number variables with custom formatting inside of strings.', () => {
            expect(chomsky.translate).toBeDefined();
            chomsky.use('fr');
            let mockDynamicValues = { placed: 123456.23 };
            // French
            expect(chomsky.translate('placements', mockDynamicValues)).toBe('Vous avez besoin 123,456.2300.');
            // English
            chomsky.use('en');
            expect(chomsky.translate('placements', mockDynamicValues)).toBe('You need 123,456.2300.');
        });

        it('should resolve plural values.', () => {
            expect(chomsky.translate).toBeDefined();
            chomsky.use('en');
            expect(chomsky.translate('messages', 0)).toBe('No messages.');
            expect(chomsky.translate('messages', 1)).toBe('Only 1 message');
            expect(chomsky.translate('messages', 50)).toBe('50 messages.');
            chomsky.use('fr');
            expect(chomsky.translate('messages', 0)).toBe('Pas de messages.');
            expect(chomsky.translate('messages', 1)).toBe('Seulement 1 message');
            expect(chomsky.translate('messages', 50)).toBe('50 messages.');
        });

        it('should resolve plural values with male dynamic labels.', () => {
            expect(chomsky.translate).toBeDefined();
            chomsky.use('en');
            let enPluralLabelPackage = {
                gender: 'male',
                quantity: 0,
                host: 'John',
                candidate: 'candidates'
            };
            expect(chomsky.translate('candidate', enPluralLabelPackage)).toBe('John has no candidates and he is sad.');
            enPluralLabelPackage.quantity = 1;
            enPluralLabelPackage.candidate = 'candidate';
            expect(chomsky.translate('candidate', enPluralLabelPackage)).toBe('John has one candidate and he is excited.');
            enPluralLabelPackage.quantity = 50;
            enPluralLabelPackage.candidate = 'candidates';
            expect(chomsky.translate('candidate', enPluralLabelPackage)).toBe('John has some candidates and he\'s ecstatic.');

            chomsky.use('fr');
            let frPluralLabelPackage = {
                gender: 'male',
                quantity: 0,
                host: 'John',
                candidate: 'candidats'
            };
            expect(chomsky.translate('candidate', frPluralLabelPackage)).toBe('John n\'a pas de candidats et il est triste.');
            frPluralLabelPackage.quantity = 1;
            frPluralLabelPackage.candidate = 'candidat';
            expect(chomsky.translate('candidate', frPluralLabelPackage)).toBe('John a un candidat et il est excité.');
            frPluralLabelPackage.quantity = 50;
            frPluralLabelPackage.candidate = 'candidats';
            expect(chomsky.translate('candidate', frPluralLabelPackage)).toBe('John a des candidats et il est extatique.');
        });

        it('should resolve plural values with female dynamic labels.', () => {
            expect(chomsky.translate).toBeDefined();
            chomsky.use('en');
            let enPluralLabelPackage = {
                gender: 'female',
                quantity: 0,
                host: 'Jen',
                candidate: 'candidates'
            };
            expect(chomsky.translate('candidate', enPluralLabelPackage)).toBe('Jen has no candidates and she is sad.');
            enPluralLabelPackage.quantity = 1;
            enPluralLabelPackage.candidate = 'candidate';
            expect(chomsky.translate('candidate', enPluralLabelPackage)).toBe('Jen has one candidate and she is excited.');
            enPluralLabelPackage.quantity = 50;
            enPluralLabelPackage.candidate = 'candidates';
            expect(chomsky.translate('candidate', enPluralLabelPackage)).toBe('Jen has some candidates and she\'s ecstatic.');

            chomsky.use('fr');
            let frPluralLabelPackage = {
                gender: 'female',
                quantity: 0,
                host: 'Jen',
                candidate: 'candidats'
            };
            expect(chomsky.translate('candidate', frPluralLabelPackage)).toBe('Jen n\'a pas de candidats et elle est triste.');
            frPluralLabelPackage.quantity = 1;
            frPluralLabelPackage.candidate = 'candidat';
            expect(chomsky.translate('candidate', frPluralLabelPackage)).toBe('Jen a un candidat et elle est excité.');
            frPluralLabelPackage.quantity = 50;
            frPluralLabelPackage.candidate = 'candidats';
            expect(chomsky.translate('candidate', frPluralLabelPackage)).toBe('Jen a des candidats et elle est extatique.');
        });

        it('should resolve plural values with other dynamic labels.', () => {
            expect(chomsky.translate).toBeDefined();
            chomsky.use('en');
            let enPluralLabelPackage = {
                gender: 'other',
                quantity: 0,
                host: 'The people',
                candidate: 'candidates'
            };
            expect(chomsky.translate('candidate', enPluralLabelPackage)).toBe('The people have no candidates and they are sad.');
            enPluralLabelPackage.quantity = 1;
            enPluralLabelPackage.candidate = 'candidate';
            expect(chomsky.translate('candidate', enPluralLabelPackage)).toBe('The people have one candidate and they are excited.');
            enPluralLabelPackage.quantity = 50;
            enPluralLabelPackage.candidate = 'candidates';
            expect(chomsky.translate('candidate', enPluralLabelPackage)).toBe('The people have some candidates and they are ecstatic.');

            chomsky.use('fr');
            let frPluralLabelPackage = {
                gender: 'other',
                quantity: 0,
                host: 'Les gens',
                candidate: 'candidats'
            };
            expect(chomsky.translate('candidate', frPluralLabelPackage)).toBe('Les gens ont pas de candidats et ils sont tristes.');
            frPluralLabelPackage.quantity = 1;
            frPluralLabelPackage.candidate = 'candidat';
            expect(chomsky.translate('candidate', frPluralLabelPackage)).toBe('Les gens ont un candidat et ils sont excités.');
            frPluralLabelPackage.quantity = 50;
            frPluralLabelPackage.candidate = 'candidats';
            expect(chomsky.translate('candidate', frPluralLabelPackage)).toBe('Les gens ont des candidats et ils sont ravis.');
        });
    });

    describe('Function: setLocation(location)', () => {
        let chomsky;
        beforeEach(() => {
            chomsky = new Chomsky();
        });
        it('should be defined.', () => {
            expect(chomsky.setLocation).toBeDefined();
        });
        it('should set the location', () => {
            chomsky.setLocation('TEST');
            expect(chomsky.location).toEqual('TEST');
        })
    });
});
