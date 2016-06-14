import {Component, Input, Output, EventEmitter} from '@angular/core';

import {User} from '../../../type/user';

@Component({
	selector: '[userRow]',
	templateUrl: './app/component/admin/users-table/user-row.component.html'
})
export class UserRowComponent {

	@Input('userRow') user: User;

	@Output('onEdit') onEdit = new EventEmitter<void>();

	@Output('onDelete') onDelete = new EventEmitter<void>();
	
	@Output('onViewEntries') onViewEntries = new EventEmitter<void>();

	editUser() {
		this.onEdit.emit(null);
	}

	deleteUser() {
		this.onDelete.emit(null);
	}
	
	viewEntries() {
		this.onViewEntries.emit(null);
	}

}