import {Interpolator} from './interpolator.ts';
import {AsyncLoader} from './asyncLoader.ts';

export class Chomsky {
	interpolator: Object;
	constructor() {
		this.interpolator = new Interpolator();
	}
}