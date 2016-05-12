import { mergeDeep } from './object-assign-deep';

export class Formats {
    constructor(locale) {
	    // Format formatDefaults
	    this.formatDefaults = {
		    currency: {
			    display: '0[.]00'
		    },
		    date: {
			    short: 'l'
		    },
		    number: {}
	    };

	    this.setLocale(locale || navigator.language);
    }

	override(formatOverrides) {
		if (formatOverrides.locale) {
			this.setLocale(formatOverrides.locale);
			delete formatOverrides['locale'];
		}
		this.formatDefaults = mergeDeep(this.formatDefaults, formatOverrides);
	}

    setLocale(locale) {
	    this.formatDefaults.locale = locale;
        moment.locale(this.formatDefaults.locale);
        numbro.setCulture(this.formatDefaults.locale);
    }

    formatNumber(value) {
        return numbro(value).format();
    }

    parseNumber(numberStr) {
        return numbro(numberStr).unformat();
    }

    formatCurrency(value, customFormat) {
        return numbro(value).formatCurrency(customFormat || this.formatDefaults.currency.display)
    }

    formatDate(date, format) {
        return moment(date).format((format || this.formatDefaults.date.short));
    }
}