export class AsyncLoader {
	get(path: string = './src/i18n/invariant.json') {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open('GET', `${path}`);
			xhr.onload = () => {
				if (xhr.status === 200 || xhr.status === 0) {
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
			xhr.onerror = () => {
				var error = new Error('Network Error');
				reject(error);
			};
			xhr.send();
		});
	}
}