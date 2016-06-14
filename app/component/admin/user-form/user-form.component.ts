import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {ControlGroup, Control, ControlArray, FormBuilder, Validators} from '@angular/common';

import {User} from '../../../type/user';
import {UserFormModel} from './user-form.model';

@Component({
    selector: ' user-form',
    templateUrl: './app/component/admin/user-form/user-form.component.html',
    directives: [
	]
})
export class UserFormComponent implements OnInit {

	@Input() user: User;
	
	@Input('error') saveError: any;

	@Output() onCancelForm = new EventEmitter<void>();
	
	@Output() onSubmitForm = new EventEmitter<User>();

	randomIdSuffix = Math.floor(Math.random() * 10000).toString();

	mainForm: ControlGroup;
	
	error: any;

	availableRoles = [
		'USER',
		'ADMIN'
	];

	_roles: boolean[];

	get roles(): boolean[] {
		if (this._roles) {
			return this._roles;
		}

		if (this.user.roles) {
			return this._roles = this.parseRoles();
		} else {
			return [];
		}
		
	}

	get formModel(): UserFormModel {
		return {
			userName: this.user.userName,
			fullName: this.user.fullName,
			password: '',
			passwordCheck: ''
		};
	}

	constructor(fb: FormBuilder) { 

		this.mainForm = fb.group({
			'userName': ['', Validators.required],
			'fullName': ['', Validators.required],
			'password': [''],
			'passwordCheck': ['']
		});

	}	

	ngOnInit() {

	}

	cancelForm() {
		this.onCancelForm.emit(null);
	}

	submitForm() {
		this.error = null;
		this.saveError = null;
		
		if (this.mainForm.value.password) {
			if (this.mainForm.value.password !== this.mainForm.value.passwordCheck) {
				this.error = "Passwords must match.";
				return;
			} 
		} else if (!this.user.userName) {
			this.error = "Passwords is mandatory.";
			return;
		}
		
		let user = this.buildUser(this.mainForm.value);
		
		this.onSubmitForm.emit(user);
	}

	buildUser(formModel: UserFormModel): User {
		let user = new User();

		user.fullName = formModel.fullName;
		user.password = formModel.password;

		if (this.user.userName) {
			user.userName = this.user.userName;
			user._links = this.user._links;
		} else {
			user.userName = formModel.userName;
		}

		user.roles = this.buildRoles();

		return user;
	}

	buildRoles(): string[] {
		console.log(this.roles);
		let roles: string[] = [];		

		this.availableRoles.forEach((val, index) => {
			if (this.roles[index]) {
				roles.push(val);
			}
		});

		return roles;
	}

	parseRoles(): boolean[] {
		if (!this.user || !this.user.roles) {
			return [];
		}

		let roles: boolean[] = [];

		this.availableRoles.forEach((val, index) => {
			roles[index] = this.user.roles.indexOf(val) !== -1;
		});

		console.log(roles);

		return roles;
	}

}
