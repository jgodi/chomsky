/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
import {AsyncLoader} from './asyncLoader.ts';

export class Interpolator {
	defaults: Object;
	loader: Object;
	constructor () {
		this.defaults = {
			language: 'en',
			locale: 'us'
		};

		this.loader = new AsyncLoader().get()
			.then(res => {
				console.log(res);
			});
	}
}

