'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Chomsky = undefined;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); // App

var _dictionarymanager = require('./dictionarymanager');

var _asyncloader = require('./asyncloader');

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Vendor
var moment = require('moment');

var Chomsky = exports.Chomsky = (function () {
	function Chomsky() {
		_classCallCheck(this, Chomsky);

		this.dictionaryManager = new _dictionarymanager.DictionaryManager();
		this.asyncLoader = new _asyncloader.AsyncLoader();

		this.translationsDictionary = this.dictionaryManager.dictionaries;

		this.changeHandlers = [];
	}

	_createClass(Chomsky, [{
		key: 'addTranslation',
		value: function addTranslation(language, translation) {
			this.dictionaryManager.addNewTranslation(language, translation);
		}
	}, {
		key: 'translationFetcher',
		value: function translationFetcher(url) {
			return this.asyncLoader.load(url);
		}
	}, {
		key: 'onChange',
		value: function onChange(callback) {
			if (callback && typeof callback === 'function') {
				this.changeHandlers.push(callback);
			}
		}
	}, {
		key: 'setLanguage',
		value: function setLanguage(language) {
			var _this = this;

			var translationObject = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			if (!translationObject) {
				translationObject = this.translationsDictionary[language];
			}
			return new Promise(function (resolve, reject) {
				// Now, only language is required
				if (language) {
					if (_this.currentLanguage === language) {
						resolve();
					} else if (translationObject) {
						_this.applyLanguage(language, translationObject);
						resolve();
					} else {
						_this.resolveTranslationObject(language).then(function (translationObject) {
							_this.applyLanguage(language, translationObject);
							resolve();
						}, function (reason) {
							return reject(reason);
						});
					}
				} else {
					reject('setLanguage: language is mandatory');
				}
			});
		}
	}, {
		key: 'applyLanguage',
		value: function applyLanguage(language, translationObject) {
			this.currentLanguage = language;

			//this.currentDictionary = this.dictionaryManager.dictionaries[language];

			//this.dictionaryManager.addNewTranslation(language, translationObject);
			this.changeHandlers.forEach(function (callback) {
				return callback();
			});
		}
	}, {
		key: 'resolveTranslationObject',
		value: function resolveTranslationObject(language) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				//var promise = ;

				if (!promise || typeof promise.then !== 'function') {
					reject('translationFetcher should return a promise');
				}

				_this2.translationFetcher(language).then(function (translationObject) {
					if (translationObject) {
						resolve(translationObject);
					} else {
						reject('translationFetcher resolved without translation object');
					}
				}, function (reason) {
					return reject('translationFetcher failed: ' + reason);
				});
			});
		}
	}, {
		key: 'constructDate',
		value: function constructDate(date, format) {
			var dateString = '';
			if (!format) {
				dateString = moment(date).format('MM[/]DD[/]YYYY');
			} else {
				dateString = moment(date).format(format);
			}
			return dateString;
		}
	}, {
		key: 'constructCurrency',
		value: function constructCurrency(currency, denominator) {
			return denominator + currency.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
		}
	}, {
		key: 'translate',
		value: function translate(key, interpolation, pluralValue) {
			var _this3 = this;

			var tokens = key.split('.');
			var value = this.translationsDictionary[this.currentLanguage];

			for (var i = 0; i < tokens.length && value !== undefined; i++) {
				value = value[tokens[i]];
			}

			if (value === undefined) {
				value = '';
			}

			// Handle pluralization
			if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
				if (typeof pluralValue === 'number') {
					var pluralization = value;
					// If pluralValue holds the number `X`, check whether `X` is a key in pluralization.
					// If it is, use the phrase of `X`. Otherwise, use `zero` or `many`.
					if (pluralization.hasOwnProperty(pluralValue)) {
						value = pluralization[pluralValue];
					} else {
						if (pluralValue === 0) {
							value = pluralization.zero;
						} else {
							// pluralValue is a number and not equals to 0, therefore pluralValue > 0
							value = pluralization.many;
						}
					}
				} else {
					value = '';
				}
			}

			// Handle interpolation
			if (interpolation) {
				value = value.replace(/{([^}]*)}/gi, function (m, param) {
					var key = param.split(':');
					if (key.length === 1) {
						var match = '';
						if (interpolation.hasOwnProperty(param)) {
							match = interpolation[param];
						}
						return match;
					} else {
						var unparsedValue = interpolation[key[0]];
						switch (key[1]) {
							case 'date':
								return _this3.constructDate(unparsedValue, key[2]);
							case 'currency':
								return _this3.constructCurrency(unparsedValue, key[2]);
							default:
								return '';
						}
					}
				});
			}

			return value;
		}
	}]);

	return Chomsky;
})();

exports.default = Chomsky;