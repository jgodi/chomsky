import { mergeDeep } from './object-assign-deep';

export class Formats {
    constructor() {
        // Format formatDefaults
        this.formatDefaults = {
            currency: {
                display: '0,0.00'
            },
            date: {
                short: 'l'
            },
            number: {
                default: ''
            }
        };
        // Initially set the locale to the browser
        this.setLocale(navigator.language);
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
        if (moment && locale) {
            // Allows en and us-EN
            // TODO: probably want to disable this. It should always be a full locale 'en-US'
            let timeLocale = (locale.split('-')[0] || locale);
            moment.locale(timeLocale);
        }
        if (numbro) {
            numbro.setCulture(this.formatDefaults.locale);
        }
    }

    formatNumber(value, format) {
        return numbro(value).format((format || this.formatDefaults.number.default));
    }

    parseNumber(numberStr) {
        return numbro().unformat(numberStr);
    }

    formatCurrency(value, format, locale) {
        let currency;
        if (locale) {
            let currentLocale = this.formatDefaults.locale;
            numbro.setCulture(locale);
            currency = numbro(value).formatCurrency(format || this.formatDefaults.currency.display);
            numbro.setCulture(currentLocale);
        } else {
            currency = numbro(value).formatCurrency(format || this.formatDefaults.currency.display);
        }
        return currency;
    }

    formatDate(date, format = this.formatDefaults.date.short, mask) {
        return moment(date, mask).format(format);
    }

    format(string, format) {
        let formattedString = string;
        switch (format) {
            case 'uppercase':
                formattedString = formattedString.toUpperCase();
                break;
            case 'lowercase':
                formattedString = formattedString.toLowerCase();
                break;
            case 'title':
                formattedString = formattedString.replace(/\w\S*/g, txt => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
                break;
            case 'denormalize':
                formattedString = formattedString.replace(/([A-Z])/g, ' $1').replace(/^./, str => { return str.toUpperCase(); });
                break;
            default:
                break;
        }
        return formattedString;
    }
}