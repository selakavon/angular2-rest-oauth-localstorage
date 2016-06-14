import {Component, Input, Output, EventEmitter} from '@angular/core';

import {TimeFromSecondsPipe} from '../../pipe/time-from-seconds.pipe';
import {DateToMillisPipe} from '../../pipe/date-to-millis.pipe';
import {TimeEntry} from '../../../type/time-entry';

@Component({
	selector: '[timeEntryRow]',
		templateUrl: './app/component/time-entries/time-entries-table/time-entry-row.component.html',
			pipes: [
				TimeFromSecondsPipe,
				DateToMillisPipe
			]
})
export class TimeEntryRowComponent {

	@Input('timeEntryRow') timeEntry: TimeEntry;

	@Output('onEdit') onEdit = new EventEmitter<void>();

	@Output('onDelete') onDelete = new EventEmitter<void>();

	editTimeEntry() {
		this.onEdit.emit(null);
	}

	deleteTimeEntry() {
		this.onDelete.emit(null);
	}

	calculateSpeed(timeEntry: TimeEntry): number {

		return timeEntry.distance * 3600 / timeEntry.timeSeconds;

	}

}