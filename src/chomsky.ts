import {Interpolator} from './interpolator';
import {AsyncLoader} from './asyncLoader';

export class Chomsky {
	interpolator: Object;
	constructor() {
		this.interpolator = new Interpolator();
	}
}