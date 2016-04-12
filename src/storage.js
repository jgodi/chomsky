/**
 * Created by jlrutledge on 4/12/2016.
 */

export class Storage {
    constructor(prefix) {
        if (typeof prefix === undefined) {
            prefix = 'storage-' + Math.random() + '-'
        }
        this.prefix = prefix;
        this.defaultObject = this._createDefaultObject();

        // check if local storage is supported
        if (this._hasLocalStorage()) {
            this.storage = localStorage;
        } else if (this._hasSessionStorage()) {
            this.storage = sessionStorage;
        } else {
            this.topLevel = {};
            this.storage = this._createDefaultImplementation();
        }

    }

    _hasLocalStorage() {
        let mod = 'storage-test-' + Math.random();
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    }

    _hasSessionStorage() {
        let mod = 'storage-test-' + Math.random();
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    }

    _createDefaultObject() {
        return {};
    }

    _createDefaultImplementation() {
        return  {
            getItem: (key) => {
                let valueStr = undefined;
                if (key in this.topLevel) {
                    valueStr = this.topLevel[key];
                }
                return valueStr;
            },
            setItem: (key, value) => {
                this.topLevel[key] = value;
            },
            removeItem: (key) => {
                delete this.topLevel[key];
            },
            clear: () => {
                this.topLevel = {};
            }
        }
    }

    getItem(key) {
        let valueStr = this.storage.getItem(this.prefix + '-' + key);
        let value = undefined;
        if (valueStr === undefined) {
            value = this.defaultObject;
        } else {
            value = JSON.parse(valueStr);
        }

        return value;
    }

    setItem(key, value) {
        let valueStr = undefined;
        if (typeof value === undefined) {
            valueStr = JSON.stringify(value)
        }
        this.storage.setItem(this.prefix + '-' + key, valueStr);
    }

    removeItem(key) {
        this.storage.removeItem(this.prefix + '-' + key);
    }

    clear() {
        this.storage.clear();
    }
}