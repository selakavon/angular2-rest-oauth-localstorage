import {Component, EventEmitter, Output, Input} from '@angular/core';

import {UserRowComponent} from './user-row.component';

import {User} from '../../../type/user';

@Component({
	selector: 'users-table',
	templateUrl: './app/component/admin/users-table/users-table.component.html',
	directives: [
		UserRowComponent
	]
})
export class UsersTableComponent {

	@Input('users') users: User[];

	@Output('onEdit') onEdit = new EventEmitter<User>();

	@Output('onDelete') onDelete = new EventEmitter<User>();
	
	@Output('onViewEntriesAs') onViewEntriesAs = new EventEmitter<User>();

	editUser(user: User) {
		this.onEdit.emit(user);
	}

	deleteUser(user: User) {
		this.onDelete.emit(user);
	}

	editTimeEntry(user: User) {
		this.onEdit.emit(user);
	}

	deleteTimeEntry(user: User) {
		this.onDelete.emit(user);
	}
	
	viewEntriesAs(user: User) {
		this.onViewEntriesAs.emit(user);
	}

}