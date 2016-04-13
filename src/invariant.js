/**
 * Created by jlrutledge on 4/12/2016.
 */

var moment = require('moment');
require('moment/locale/fr');

export class Invariant {
    constructor(locale) {
        if (locale == null) {
            this.locale = navigator.language;
        } else {
            this.locale = locale;
        }

        moment.locale(this.locale);
    }

    getLocale() {
        return this.locale;
    }

    setLocale(locale) {
        this.locale = locale;
        moment.locale(this.locale)
    }

    formatNumber(value) {
        return value.toLocaleString(this.locale);
    }

    formatCurrency(value, currency) {
        return value.toLocaleString(this.locale, {style:'currency', currency:currency });
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