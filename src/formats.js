// Set defaults
export class Formats {
    constructor(locale) {
        this.setLocale(locale || navigator.language);
    }

	override(formatOverrides) {
		//console.log(formatOverrides);
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

    formatDate(date, format) {
        return moment(date).format((format || 'l'));
    }
}