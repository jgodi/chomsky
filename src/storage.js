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
        } catch (e) {
            return false;
        }
    }

    _hasSessionStorage() {
        let mod = 'storage-test-' + Math.random();
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    }

    _createDefaultObject() {
        return {};
    }

    _createDefaultImplementation() {
        return {
            getItem: (key) => {
                let valueStr = null;
                if (this.topLevel[key]) {
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

    getStorageKey(key) {
        return this.prefix + '-' + key;
    }

    getItem(key) {
        let valueStr = this.storage.getItem(this.getStorageKey(key));
        let value = null;
        if (valueStr == null) {
            value = this.defaultObject;
        } else {
            value = JSON.parse(valueStr);
        }

        return value;
    }

    setItem(key, value) {
        let valueStr = null;
        if (value != null) {
            valueStr = JSON.stringify(value)
        }
        this.storage.setItem(this.getStorageKey(key), valueStr);
    }

    removeItem(key) {
        this.storage.removeItem(this.getStorageKey(key));
    }

    clear() {
        this.storage.clear();
    }
}