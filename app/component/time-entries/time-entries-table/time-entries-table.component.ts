import {Component, EventEmitter, Output, Input} from '@angular/core';

import {TimeEntryRowComponent} from './time-entry-row.component';

import {TimeEntry} from '../../../type/time-entry';

@Component({
	selector: 'time-entries-table',
	templateUrl: './app/component/time-entries/time-entries-table/time-entries-table.component.html',
	directives: [
		TimeEntryRowComponent
	]
})
export class TimeEntriesTableComponent {

	@Input('timeEntries') timeEntries: TimeEntry[];

	@Output('onEdit') onEdit = new EventEmitter<TimeEntry>();

	@Output('onDelete') onDelete = new EventEmitter<TimeEntry>();

	editTimeEntry(timeEntry: TimeEntry) {
		this.onEdit.emit(timeEntry);
	}

	deleteTimeEntry(timeEntry: TimeEntry) {
		this.onDelete.emit(timeEntry);
	}

}