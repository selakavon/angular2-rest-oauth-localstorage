import {Injectable} from '@angular/core';

declare var localStorage: any;

@Injectable()
export class LocalStorageService {

	constructor() {
	}	

	getItem(key: string): any {
		return localStorage.getItem(key);
	}

	setItem(key: string, value: any) {
		localStorage.setItem(key, value);
	}

	removeItem(key: string) {
		return localStorage.removeItem(key);
	}

}