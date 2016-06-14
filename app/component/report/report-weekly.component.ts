import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';

import {ReportWeeklyService} from '../../service/report-weekly.service';
import {TimeEntryService} from '../../service/time-entry.service';

import {ReportWeeklyTableComponent} from './report-weekly-table/report-weekly-table.component';

import {ReportWeek} from '../../type/report-week';

import {TimeEntry} from '../../type/time-entry';

@Component({
	selector: 'report-weekly',
	templateUrl: './app/component/report/report-weekly.component.html',
	directives: [
		ReportWeeklyTableComponent
	]
})
export class ReportWeeklyComponent implements  OnInit {
	
	reportWeeks: ReportWeek[];

	constructor(
		private _reportService: ReportWeeklyService,
		private _router: Router,
		private _timeEntryService: TimeEntryService
		) {}

	ngOnInit() {
		this.fetchReports();	
	}

	fetchReports() {
		this._reportService.getReports().subscribe(
			(res) => {
				this.reportWeeks = res;
			}
		);
	}

	expand(reportWeek: ReportWeek) {
		let index = this.reportWeeks.findIndex((rw) =>
			reportWeek._links.self.href === rw._links.self.href
		);

		this._reportService.getReport(reportWeek._links.self.href).subscribe(
			(res) => {
				this.reportWeeks[index] = res;
			},
			(err) => {
				if (err.status === 404) {
					this.reportWeeks.splice(index, 1);
				}
			}
		);
	}

	editTimeEntry(timeEntry: TimeEntry) {
		this._router.navigate(['/time-entry-edit', { href: timeEntry._links.self.href }]);
	}

	deleteTimeEntry(compositeInfo: any) {
		this._timeEntryService.deleteTimeEntry(compositeInfo.timeEntry).subscribe(
			(res) => {
				this.expand(compositeInfo.reportWeek);
			}
		);
	}

}