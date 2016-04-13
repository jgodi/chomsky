'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by jlrutledge on 4/12/2016.
 */

var Storage = exports.Storage = (function () {
    function Storage(prefix) {
        _classCallCheck(this, Storage);

        if ((typeof prefix === 'undefined' ? 'undefined' : _typeof(prefix)) === undefined) {
            prefix = 'storage-' + Math.random() + '-';
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

    _createClass(Storage, [{
        key: '_hasLocalStorage',
        value: function _hasLocalStorage() {
            var mod = 'storage-test-' + Math.random();
            try {
                localStorage.setItem(mod, mod);
                localStorage.removeItem(mod);
                return true;
            } catch (e) {
                return false;
            }
        }
    }, {
        key: '_hasSessionStorage',
        value: function _hasSessionStorage() {
            var mod = 'storage-test-' + Math.random();
            try {
                sessionStorage.setItem(mod, mod);
                sessionStorage.removeItem(mod);
                return true;
            } catch (e) {
                return false;
            }
        }
    }, {
        key: '_createDefaultObject',
        value: function _createDefaultObject() {
            return {};
        }
    }, {
        key: '_createDefaultImplementation',
        value: function _createDefaultImplementation() {
            var _this = this;

            return {
                getItem: function getItem(key) {
                    var valueStr = null;
                    if (_this.topLevel[key]) {
                        valueStr = _this.topLevel[key];
                    }
                    return valueStr;
                },
                setItem: function setItem(key, value) {
                    _this.topLevel[key] = value;
                },
                removeItem: function removeItem(key) {
                    delete _this.topLevel[key];
                },
                clear: function clear() {
                    _this.topLevel = {};
                }
            };
        }
    }, {
        key: 'getStorageKey',
        value: function getStorageKey(key) {
            return this.prefix + '-' + key;
        }
    }, {
        key: 'getItem',
        value: function getItem(key) {
            var valueStr = this.storage.getItem(this.getStorageKey(key));
            var value = null;
            if (valueStr == null) {
                value = this.defaultObject;
            } else {
                value = JSON.parse(valueStr);
            }

            return value;
        }
    }, {
        key: 'setItem',
        value: function setItem(key, value) {
            var valueStr = null;
            if (value != null) {
                valueStr = JSON.stringify(value);
            }
            this.storage.setItem(this.getStorageKey(key), valueStr);
        }
    }, {
        key: 'removeItem',
        value: function removeItem(key) {
            this.storage.removeItem(this.getStorageKey(key));
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.storage.clear();
        }
    }]);

    return Storage;
})();