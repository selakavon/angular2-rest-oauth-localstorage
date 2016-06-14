import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, RequestOptions, Response, Headers} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {LoginService} from './login.service';

@Injectable()
export class AuthHttpService {

	access_token: string;

	constructor(private _http: Http) {
	}

	get(url: string, options?: RequestOptionsArgs): Observable<Response> {

		let authOptions = this.createAuthorizedRequestOptions(options);		

		return this._http.get(url, authOptions);
	}	

	post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {

		let authOptions = this.createAuthorizedRequestOptions(options);

		return this._http.post(url, body, authOptions);
	}	
	
	put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {

		let authOptions = this.createAuthorizedRequestOptions(options);

		return this._http.put(url, body, authOptions);
	}	

	delete(url: string, options?: RequestOptionsArgs): Observable<Response> {

		let authOptions = this.createAuthorizedRequestOptions(options);

		return this._http.delete(url, authOptions);
	}	

	createAuthorizedRequestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
		let authOptions;
		if (options) {
			authOptions = options;
			if (!authOptions.headers) {
				authOptions.headers = new Headers();
			}
		} else {
			authOptions = new RequestOptions({ headers: new Headers() });
		}

		this.authenticatedRequestOptions(authOptions.headers);

		return authOptions;
	}

	authenticatedRequestOptions(headers: Headers) {
		this.headersBearerAuthorization(headers);

		let options = new RequestOptions({ headers: headers });

		return options;
	}

	headersBearerAuthorization(headers: Headers) {
		headers.append('Authorization', 'Bearer ' + this.access_token);
	}

}