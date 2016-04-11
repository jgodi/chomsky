/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
export class AsyncLoader {
	public get(url: string) {
		return new Promise((resolve, reject) => {
			if (url) {
				let xhr = new XMLHttpRequest();
				xhr.open('GET', `${url}`);
				// Success
				xhr.onload = () => {
					if (xhr.status === 200) {
						try {
							let translationObject = JSON.parse(xhr.responseText);
							resolve(translationObject);
						} catch(e) {
							let error = new Error(`Parse Error: ${e.toString()}`);
							reject(error);
						}
					} else {
						let error = new Error(xhr.statusText);
						reject(error);
					}
				};
				// Error
				xhr.onerror = () => {
					var error = new Error('Network Error');
					reject(error);
				};
				xhr.send();
			} else {
				reject('No URL specified.')
			}
		});
	}
}