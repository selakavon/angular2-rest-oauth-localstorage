import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import {ControlGroup, Control, FormBuilder, Validators} from '@angular/common';

import {LoginService} from './../../service/login.service';

import {UserRegisterComponent} from './user-register.component';

import {UserLoginModel} from './user-login.model';

@Component({
	selector: 'user-login',
	templateUrl: 'app/component/user/user-login.component.html',
	directives: [
        ROUTER_DIRECTIVES
        ]
})
export class UserLoginComponent {

	loginForm: ControlGroup;

	loginError: Error;

	login = new UserLoginModel();

	constructor(fb: FormBuilder,
		private _router: Router,
		private _loginService: LoginService) {

		this.loginForm = fb.group({
			'userName': ['', Validators.required],
			'password': ['', Validators.required],
		});

	}	

	submitForm() {
		this._loginService.login(this.login.userName, this.login.password,
			() => this._router.navigate(['']),
			(err) => this.loginError = err
		);
	}


}