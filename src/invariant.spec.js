/**
 * Created by jlrutledge on 4/12/2016.
 */

import {Invariant} from './invariant';

describe('Class: Invariant', () => {

    it('Empty constructor', () => {
        let invariant = new Invariant;
        let actual = invariant.getLocale()

        expect(actual).toEqual(navigator.language);
    });

    it('locale constructor', () => {
        let locale = "fr-CA";
        let invariant = new Invariant(locale);
        let actual = invariant.getLocale();

        expect(actual).toEqual(locale);
    });

    it('changeLocale', () => {
        let firstLocale = "fr-CA";
        let secondLocale = "en-US";
        let invariant = new Invariant(firstLocale);
        invariant.setLocale(secondLocale);
        let actual = invariant.getLocale();
        
        expect(actual).toEqual(secondLocale);
    });

    it('currency US format', () => {
        let invariant = new Invariant("en-US");
        let actual = invariant.formatCurrency(123456789, 'USD');

        expect(actual).toEqual('123,456,789');
    });

    it('currency UK format', () => {
        let invariant = new Invariant("en-GB");
        let actual = invariant.formatCurrency(123456789, 'USD');

        expect(actual).toEqual('123.456.789');
    });

    it('format short date US', () => {
        let invariant = new Invariant("en-US");

        let actual = invariant.formatShortDate(1360013296000);

        expect(actual).toEqual('2/4/2013');
    });

    it('format short date France', () => {
        let invariant = new Invariant('fr');

        let actual = invariant.formatShortDate(1360013296000);

        expect(actual).toEqual('4/2/2013');
    });

    it('parse short date US', () => {
        let invariant = new Invariant('en-us');

        let actual = invariant.parseShortDate('2/4/2013');

        expect(actual.utc().toDate().getTime()).toEqual(1359954000000);
    });

    it('parse short date France', () => {
        let invariant = new Invariant('fr');

        let actual = invariant.parseShortDate('4/2/2013');

        expect(actual.utc().toDate().getTime()).toEqual(1359954000000);
    });

    it('parse short date change format', () => {
        let invariant = new Invariant('en-us');

        let actual = invariant.parseShortDate('2/4/2013');

        expect(actual.utc().toDate().getTime()).toEqual(1359954000000);

        invariant.setLocale('fr');

        actual = invariant.parseShortDate('4/2/2013');

        expect(actual.utc().toDate().getTime()).toEqual(1359954000000);
    });

    it('format time US', () => {
        let invariant = new Invariant('en');

        let actual = invariant.formatTime(1460567156000);

        expect(actual).toEqual('1:05 PM');
    })

    it('parse time US', () => {
        let invariant = new Invariant('us');

        let actual = invariant.parseTime('12:15 PM');

        let expected = new Date();
        expected.setHours(12,15,0,0);

        expect(actual.toDate().getTime()).toEqual(expected.getTime());
    })

    it('format time FR', () => {
        let invariant = new Invariant('fr');

        let actual = invariant.formatTime(1460567156000);

        expect(actual).toEqual('13:05');
    })

    it('parse time FR', () => {
        let invariant = new Invariant('fr');

        let actual = invariant.parseTime('13:15');

        let expected = new Date();
        expected.setHours(13,15,0,0);

        expect(actual.toDate().getTime()).toEqual(expected.getTime());
    })

});
