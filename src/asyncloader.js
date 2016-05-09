export class AsyncLoader {
    load(url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);

            xhr.onload = () => {
                if (xhr.status === 200) {
                    try {
                        let translationObject = JSON.parse(xhr.responseText);
                        resolve(translationObject);
                    } catch (e) {
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