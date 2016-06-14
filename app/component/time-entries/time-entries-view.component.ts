import {Component, OnInit} from '@angular/core';

import {Router, ROUTER_DIRECTIVES, OnActivate, RouteSegment} from '@angular/router';

import {TimeEntriesTableComponent} from './time-entries-table/time-entries-table.component';

import {TimeEntryService} from '../../service/time-entry.service';

import {TimeEntry} from '../../type/time-entry';

import {DateRangeFilterComponent} from '../filter/date-range-filter.component';
import {DateRangeFilter} from '../../type/date-range-filter';

import {URLParserService} from '../../service/url-parser.service';
import {LoginService} from '../../service/login.service';

@Component({
	selector: 'time-entries-view',
	templateUrl: './app/component/time-entries/time-entries-view.component.html',
	directives: [
		TimeEntriesTableComponent,
		DateRangeFilterComponent,
		ROUTER_DIRECTIVES
	]
})
export class TimeEntriesViewComponent implements OnInit, OnActivate {

	timeEntries: TimeEntry[];

	dateRangeFilter = new DateRangeFilter();
	
	entriesHref: string;
	impersonatedUser: string;
	
	constructor(
		private _timeEntryService: TimeEntryService,
		private _router: Router,
		private _urlParserService: URLParserService,
		private _loginService: LoginService) {
	}
	
	routerOnActivate(curr: RouteSegment) {
		this.entriesHref = curr.getParam('entriesHref');
		this.impersonatedUser = curr.getParam('name');
	}
	
	ngOnInit() {
		if (this._loginService.authenticated()) {
			this.fetchTimeEntries();
		}
		
	}

	editTimeEntry(timeEntry: TimeEntry) {
		let relativeHref = this._urlParserService.parseUrl(timeEntry._links.self.href).pathname;
		
		this._router.navigate(['/time-entry-edit', { href: relativeHref }]);
	}

	deleteTimeEntry(timeEntry: TimeEntry) {
		this._timeEntryService.deleteTimeEntry(timeEntry).subscribe(
			(res) => this.fetchTimeEntries()
		);
	}

	createTimeEntry() {
		if (this.entriesHref) {
			this._router.navigate(['/time-entry-edit', { entriesHref: this.entriesHref }]);
		} else {
			this._router.navigate(['/time-entry-edit']);
		}
	}

	onSearch(filter: DateRangeFilter) {
		this.fetchTimeEntries(filter);
	}

	fetchTimeEntries(filter?: DateRangeFilter) {
		this._timeEntryService.getTimeEntries(filter, this.entriesHref).subscribe(
			(res) => {
				this.timeEntries = res;
			}
		);
	}

}