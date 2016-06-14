import {Component, EventEmitter, Output, Input} from '@angular/core';

import {TimeEntryRowComponent} from '../../time-entries/time-entries-table/time-entry-row.component';
import {ReportWeekRowComponent} from './report-week-row.component';

import {TimeEntry} from '../../../type/time-entry';
import {ReportWeek} from '../../../type/report-week';

@Component({
	selector: 'report-weekly-table',
	templateUrl: './app/component/report/report-weekly-table/report-weekly-table.component.html',
	directives: [
		TimeEntryRowComponent,
		ReportWeekRowComponent
	]
})
export class ReportWeeklyTableComponent {

	@Input('reportWeeks') reportWeeks: ReportWeek[];

	@Output('onEdit') onEdit = new EventEmitter<TimeEntry>();

	@Output('onDelete') onDelete = new EventEmitter<any>();

	@Output('onExpand') onExpand = new EventEmitter<ReportWeek>();

	expand(reportWeek: ReportWeek) {
		this.onExpand.emit(reportWeek);
	}

	collapse(reportWeek: ReportWeek) {
		reportWeek.timeEntries = null;
	}

	toggle(reportWeek: ReportWeek) {
		if (reportWeek.timeEntries) {
			this.collapse(reportWeek);
		} else {
			this.expand(reportWeek);
		}
	}

	editTimeEntry(timeEntry: TimeEntry) {
		this.onEdit.emit(timeEntry);
	}

	deleteTimeEntry(timeEntry: TimeEntry, reportWeek: ReportWeek) {
		this.onDelete.emit({
			timeEntry: timeEntry,
			reportWeek: reportWeek
		});
	}

}