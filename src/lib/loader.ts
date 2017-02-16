// Vendor
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

/**
 * @name Loader
 * @description Loader to load the JSON translation files via HTTP
 * @class Loader
 */
export class Loader {

    /**
     * @name load
     * @description loads a given URL via HTTP
     * @param {string} url
     * @returns {Observable<string>}
     * @memberOf Loader
     */
    public load(url: string): Observable<string> {
        return Observable.fromPromise(new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);

            xhr.onload = () => {
                if (xhr.status === 200) {
                    try {
                        resolve(JSON.parse(xhr.responseText));
                    } catch (e) {
                        reject(`Parse Error: Invalid JSON`);
                    }
                } else {
                    reject(xhr.statusText);
                }
            };

            xhr.onerror = () => {
                reject('Network Error');
            };

            xhr.send();
        }));
    }
}
