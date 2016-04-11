export class CacheManager {
	isLocalStorageEnabled: Boolean = false;
	key: string;
	constructor() {
		this.isLocalStorageEnabled = this.checkLocalStorageFeature();
		this.key = 'Chomsky';
	}

	checkLocalStorageFeature(): boolean {
		try {
			localStorage.setItem('t', 't');
			localStorage.removeItem('t');
			return true;
		} catch (exception) {
			return false;
		}
	}

	get(): Object {
		let storedData = {};
		if (this.isLocalStorageEnabled) {
			storedData = localStorage.getItem(this.key) ? JSON.parse(localStorage.getItem(this.key)) : {};
		}
		return storedData;
	}

	set(item) {
		if (this.isLocalStorageEnabled) {
			localStorage.setItem(this.key, JSON.stringify(item));
		}
	}
}