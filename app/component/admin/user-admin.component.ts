import {Component, OnInit} from '@angular/core';

import {Router, ROUTER_DIRECTIVES} from '@angular/router';

import {UsersTableComponent} from './users-table/users-table.component';

import {UserService} from '../../service/user.service';

import {User} from '../../type/user';

import {URLParserService} from '../../service/url-parser.service';

@Component({
	selector: 'user-admin',
	templateUrl: './app/component/admin/user-admin.component.html',
	directives: [
		UsersTableComponent,
		ROUTER_DIRECTIVES
	]
})
export class UserAdminComponent implements OnInit {

	users: User[];

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _urlParserService: URLParserService) { }
	
	ngOnInit() {
		this.fetchUsers();
	}

	fetchUsers() {
		this._userService.getUsers().subscribe(
			(res) => this.users = res
		);
	}

	editUser(user: User) {
		let relativeHref = this._urlParserService.parseUrl(user._links.self.href).pathname;
		
		this._router.navigate(['/user-edit', { href: relativeHref }]);
	}

	createUser() {
		this._router.navigate(['/user-edit']);	
	}

	deleteUser(user: User) {
		this._userService.deleteUser(user).subscribe(
			(res) => this.fetchUsers()
			);
	}
	
	viewEntriesAs(user: User) {
		let timeEntriesHref = this.getRelativeHref(user._links.timeEntries.href);
		
		this._router.navigate(['/time-entries', {
			entriesHref: timeEntriesHref,
			name: user.fullName
		}]);
	}
	
	getRelativeHref(href: string) {
		return this._urlParserService.parseUrl(href).pathname;
	}

}