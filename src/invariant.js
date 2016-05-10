import moment from 'moment';
import numeral from 'numeral';

// Set defaults

export class Invariant {
    constructor(locale) {
        this.setLocale(locale || navigator.language);
    }

    getLocale() {
        return this.locale;
    }

    setLocale(locale) {
        this.locale = locale.toLowerCase();
        moment.locale(this.locale);

        try {
            numeral.language(this.locale);
        } catch (e) {
            // no op, local not supported with numeral
        }
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