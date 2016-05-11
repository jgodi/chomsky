// Set defaults
export class Invariant {
    constructor(locale) {
        this.setLocale(locale || navigator.language);
    }

    getLocale() {
        return this.locale;
    }

    setLocale(locale) {
        this.locale = locale;
        moment.locale(this.locale);
        numbro.setCulture(this.locale);
    }

    formatNumber(value) {
        return numbro(value).format();
    }

    parseNumber(numberStr) {
        return numbro(numberStr).unformat();
    }

    formatCurrency(value, customFormat) {
        return numbro(value).formatCurrency(customFormat || '')
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