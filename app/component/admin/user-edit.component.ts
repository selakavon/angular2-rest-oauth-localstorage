import {Component} from '@angular/core';
import {Location} from '@angular/common';

import {OnActivate, RouteSegment, Router} from '@angular/router';

import {UserFormComponent} from './user-form/user-form.component';

import {UserService} from '../../service/user.service';

import {User} from '../../type/user';

@Component({
	selector: 'user-edit',
	templateUrl: './app/component/admin/user-edit.component.html',
	directives: [
		UserFormComponent
	]
})
export class UserEditComponent implements OnActivate {
	
	user: User = new User();
	
	error: any;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _location: Location) {}

	routerOnActivate(curr: RouteSegment) {

		let userHref = curr.getParam('href');

		if (userHref) {
			this.fetchUser(userHref);
		}
	}

	fetchUser(userHref: string) {
		this._userService.getUser(userHref).subscribe(
			(res) => this.user = res
			);
	}

	saveUser(user: User) {
		this._userService.saveUser(user).subscribe(
			(res) => this.goBack(),
			(err) => this.error = err
 		);
	}

	cancelEdit() {
		this.goBack();
	}

	goBack() {
		this._router.navigate(['/user-admin']);
	}

}