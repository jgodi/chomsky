/**
 * Created by jlrutledge on 4/12/2016.
 */

var moment = require('moment');
require('moment/locale/fr');

require('intl');

// TODO: fix bootstrapping
require('intl/locale-data/jsonp/en-US');
require('intl/locale-data/jsonp/fr');
require('intl/locale-data/jsonp/ru');

var numeral = require('numeral');

// TODO: fix bootstrapping
var en = {
    delimiters: {
        thousands: ',',
        decimal: '.'
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal: function (number) {
        return number === 1 ? 'er' : 'e';
    },
    currency: {
        symbol: '$'
    }
};
numeral.language('en-us', en);
var fr = {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal: function (number) {
        return number === 1 ? 'er' : 'e';
    },
    currency: {
        symbol: '€'
    }
};
numeral.language('fr-fr', fr);
var ru = {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'тыс.',
        million: 'млн',
        billion: 'b',
        trillion: 't'
    },
    ordinal: function () {
        // not ideal, but since in Russian it can taken on
        // different forms (masculine, feminine, neuter)
        // this is all we can do
        return '.';
    },
    currency: {
        symbol: 'руб.'
    }
};
numeral.language('ru-ru', ru);

export class Invariant {
    constructor(locale) {
        if (locale == null) {
            locale = navigator.language;
        }

        this.setLocale(locale);

    }

    getLocale() {
        return this.locale;
    }

    setLocale(locale) {
        this.locale = locale.toLowerCase();
        moment.locale(this.locale);
        numeral.language(this.locale);
    }

    formatNumber(value) {
        return value.toLocaleString(this.locale);
    }

    parseNumber(numberStr) {
        return numeral().unformat(numberStr);
    }

    formatCurrency(value, currency) {
        return value.toLocaleString(this.locale, { style: 'currency', currency: currency });
    }

    formatShortDate(date) {
        return moment(date).format('l');
    }

    parseShortDate(dateStr) {
        return moment(dateStr, 'l');
    }

    formatTime(time) {
        return moment(time).format('LT');
    }

    parseTime(timeStr) {
        return moment(timeStr, 'LT');
    }

}