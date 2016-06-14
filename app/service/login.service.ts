import {Injectable, OnInit} from '@angular/core';

import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {User} from '../type/user';
import {AuthToken} from './auth-token';

import {AuthHttpService} from './auth-http.service';
import {LocalStorageService} from './local-storage.service';
import {TimeEntryService} from './time-entry.service';
import {ReportWeeklyService} from './report-weekly.service';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService implements OnInit {

	user: User;

	private CLIENT_ID = 'webui';
	private CLIENT_SECRET = 'webuisecret';

	constructor(
		private _http: Http,
		private _authHttpService: AuthHttpService,
		private _localStorageService: LocalStorageService,
		private _timeEntryService: TimeEntryService,
		private _reportWeeklyService: ReportWeeklyService
		) {

		let user = this.readAuthenticationFromStorage();
		if (user) {
			this.fetchUserInfo(user);
		}

	}

	ngOnInit() {

	}

	authenticated(): boolean {
		return this.user != null;
	}
	
	hasRole(role: string) : boolean {
		if (this.user == null) {
			return false;
		}
		
		
		return this.user.roles.indexOf(role) !== -1; 
	}

	storeUserInfo(response: Response) {
		let body = response.json();

		this.user = new User();
		this.user.userName = body.userName;
		this.user.fullName = body.fullName;
		this.user.roles = body.roles;
		
		this.user._links = body._links;
	}
	
	setUpServiceLinks() {
		this._timeEntryService.timeEntriesUrl = this.user._links.timeEntries.href;
		this._reportWeeklyService.reportsUrl = this.user._links.reportWeeks.href;
	}

	login(userName: string, password: string, onSuccess: () => any, onError: (error: any) => any) {
		return this._http.post("/oauth/token",
			this.oAuth2RequestBody(userName, password),
			this.oAuthRequestOptions(userName, password)
		).map((resp) => resp.json())
			.catch(this.handleLoginError)
			.subscribe(
				(resp) => {
					this.handleTokenResponse(resp, userName, onSuccess);
				},
				(err) => {
					onError(err);
				}
			);
	}

	readAuthenticationFromStorage(): string {
		let user = this._localStorageService.getItem('logged_user');
		let access_token = this._localStorageService.getItem('access_token');

		if (user && access_token) {
			this._authHttpService.access_token = access_token;			
			return user;
		}

		return null;
	}

	storeAuthentication(authToken: AuthToken, userName: string) {
		this._localStorageService.setItem('access_token', authToken.access_token);
		this._localStorageService.setItem('logged_user', userName);

		this._authHttpService.access_token = authToken.access_token;
	}

	clearAuthentication() {
		this._localStorageService.removeItem('access_token');
		this._localStorageService.removeItem('logged_user');
		this._authHttpService.access_token = null;
	}

	logout(onSuccess?: () => any) {
		this.user = null;

		this.clearAuthentication();

		if (onSuccess) {
			onSuccess();
		}
	}

	handleTokenResponse(response: any, userName: string, onSuccess: () => any) {
		let body = response;

		this.storeAuthentication(body, userName);

		this.fetchUserInfo(userName, onSuccess);
		
	}

	fetchUserInfo(userName: string, onSuccess?: () => any) {
		this._authHttpService.get("/api/users/" + userName)
			.subscribe(
			(resp) => {
				this.storeUserInfo(resp);

				this.setUpServiceLinks();

				if (onSuccess) { 
					onSuccess();
				}
			},
			(err) => {
				this.logout();
			}
			);
	}

	handleLoginError(error: any) {

		let msg = 'Server Error';

		if (error.status === 400) {
			msg = "Wrong user or password";
		}

		msg = "Login failed : " + msg;

		return Observable.throw(msg);
	}

	oAuth2RequestBody(userName: string, password: string): string {
		let body = `username=${userName}`
			+ `&password=${password}`
			+ `&grant_type=password`
			+ `&scope=read%20write`
			+ `&client_id=${this.CLIENT_ID}`
			+ `&client_secret=${this.CLIENT_SECRET}`;

		return body;
	}

	oAuthRequestOptions(userName: string, password: string) {
		let headers = new Headers();

		this.headersAcceptJson(headers);
		this.headersContentType(headers);
		this.headersBasicAuthorization(headers, userName, password);

		let options = new RequestOptions({ headers: headers });

		return options;
	}

	headersContentType(headers: Headers) { 
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
	}

	headersBasicAuthorization(headers: Headers, userName: string, password: string) {
		headers.append('Authorization', 'Basic ' + btoa(this.CLIENT_ID + ':' + this.CLIENT_SECRET));
	}

	headersAcceptJson(headers: Headers) {
		headers.append('Accept', 'application/json');
	}	

}
