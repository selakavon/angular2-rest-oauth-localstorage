import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Http, RequestOptions, Headers} from '@angular/http';

import {AuthHttpService} from './auth-http.service';

import {User} from '../type/user';

@Injectable()
export class UserService {

	usersUrl = '/api/users';

	constructor(
		private _http: AuthHttpService,
		private _httpAnonymous: Http) { }

	getUsers(): Observable<User[]> {
		return this._http.get(this.usersUrl)
			.map((res) => this.usersFromJson(res.json().data))
			.catch(this.handleError);
	}

	getUser(timeEntryHref: string): Observable<User> {
		return this._http.get(timeEntryHref)
			.map((res) => this.userFromJson(res.json()))
			.catch(this.handleError);
	}

	saveUser(user: User): Observable<User> {
		if (user._links && user._links.self) {
			return this.putUser(user);
		} else {
			return this.postUser(user);
		}
	}

	deleteUser(user: User): Observable<void> {
		return this._http.delete(user._links.self.href)
			.catch(this.handleError);
	}

	private putUser(user: User): Observable<User> {
		return this._http.put(user._links.self.href, JSON.stringify(user), this.jsonRequestOptions())
			.map((res) => this.userFromJson(res.json()))
			.catch(this.handleError);
	}

	private postUser(user: User): Observable<User> {
		return this._httpAnonymous.post(this.usersUrl, JSON.stringify(user), this.jsonRequestOptions())
			.map((res) => this.userFromJson(res.json()))
			.catch(this.handleError);
	}

	usersFromJson(jsonArray: [any]): User[] {
		
		let users = [];

		jsonArray.forEach(
			(json) => users.push(this.userFromJson(json))
		);

		return users;
	}

	userFromJson(json: any): User {
		let user = new User();

		user.fullName = json.fullName;
		user.userName = json.userName;
		user.roles = json.roles;

		user._links = json._links;

		return json;
	}

	handleError(error: any) {
		if (error.status === 409) {
			return Observable.throw('User already exists');
		}
		return Observable.throw(error);
	}

	private jsonRequestOptions(): RequestOptions {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return options;
	}

}