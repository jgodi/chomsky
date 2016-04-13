'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AsyncLoader = exports.AsyncLoader = (function () {
    function AsyncLoader() {
        _classCallCheck(this, AsyncLoader);
    }

    _createClass(AsyncLoader, [{
        key: 'load',
        value: function load(url) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);

                xhr.onload = function () {
                    if (xhr.status === 200) {
                        try {
                            var translationObject = JSON.parse(xhr.responseText);
                            resolve(translationObject);
                        } catch (e) {
                            var error = new Error('Parse Error: ' + e.toString());
                            reject(error);
                        }
                    } else {
                        var _error = new Error(xhr.statusText);
                        reject(_error);
                    }
                };

                xhr.onerror = function () {
                    var error = new Error('Network Error');
                    reject(error);
                };

                xhr.send();
            });
        }
    }]);

    return AsyncLoader;
})();