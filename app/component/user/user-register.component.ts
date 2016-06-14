import {Component} from '@angular/core';

import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import {ControlGroup, Control, FormBuilder, Validators} from '@angular/common';

import {UserRegisterFormModel} from './user-register-form.model';

import {UserService} from '../../service/user.service';

import {User} from '../../type/user';

@Component({
	selector: 'user-register',
	templateUrl: 'app/component/user/user-register.component.html',
	directives: [
        ROUTER_DIRECTIVES
	]
})
export class UserRegisterComponent {

	registerForm: ControlGroup;
	
	error: any;

	formModel = new UserRegisterFormModel();

	constructor(
		fb: FormBuilder,
		private _userService: UserService,
		private _router: Router) {

		this.registerForm = fb.group({
			'fullName': ['', Validators.required],
			'userName': ['', Validators.required],
			'password': ['', Validators.required],
			'passwordConfirm': ['', Validators.required]
		});

	}	

	submitForm() {
		this.error = null;
		
		if (!this.registerForm.valid) {
			return;
		}
		
		if (this.registerForm.value.password !== this.registerForm.value.passwordConfirm) {
			this.error = "Passwords must match.";
			return;
		} 
		
		let user = this.buildUser(this.registerForm.value);
		
		this._userService.saveUser(user).subscribe(
			(res) => this._router.navigate(['/login']),
			(err) => this.error = err
		);
	}
	
	buildUser(formModel: UserRegisterFormModel) {
		
		let user = new User();
		
		user.fullName = formModel.fullName;
		user.userName = formModel.userName;
		user.password = formModel.password;
		
		return user;
	}

}