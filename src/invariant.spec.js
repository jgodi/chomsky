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
    })

    it('currency UK format', () => {
        let invariant = new Invariant("en-GB");
        let actual = invariant.formatCurrency(123456789, 'USD');

        expect(actual).toEqual('123.456.789');
    })

    it('format short date US', () => {
        let invariant = new Invariant("en-US");

        let actual = invariant.formatShortDate(1360013296000);

        expect(actual).toEqual('2/4/2013');
    })

    it('format short date France', () => {
        let invariant = new Invariant('fr');

        let actual = invariant.formatShortDate(1360013296000);

        expect(actual).toEqual('4/2/2013');
    })

    it('parse short date US', () => {
        let invariant = new Invariant('en-US');

        let actual = invariant.parseShortDate('2/4/2013');

        expect(actual.utc().toDate().getTime()).toEqual(1359954000000);
    })

    it('parse short date France', () => {
        let invariant = new Invariant('fr');

        let actual = invariant.parseShortDate('4/2/2013');

        expect(actual.utc().toDate().getTime()).toEqual(1359954000000);
    })

});
