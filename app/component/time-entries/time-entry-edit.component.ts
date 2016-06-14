import {Component} from '@angular/core';
import {Location} from '@angular/common';

import {OnActivate, RouteSegment, Router} from '@angular/router';

import {TimeEntryFormComponent} from './time-entry-form/time-entry-form.component';

import {TimeEntryService} from '../../service/time-entry.service';

import {TimeEntry} from '../../type/time-entry';

@Component({
	selector: 'time-entry-edit',
	templateUrl: './app/component/time-entries/time-entry-edit.component.html',
	directives: [
		TimeEntryFormComponent
	]
})
export class TimeEntryEditComponent implements OnActivate {
	
	timeEntry: TimeEntry = new TimeEntry();
	
	entriesHref: string;

	prevUrl: string;
	prevParams: any;

	constructor(
		private _timeEntryService: TimeEntryService,
		private _router: Router,
		private _location: Location) {}

	routerOnActivate(curr: RouteSegment, prev: RouteSegment) {
		let timeEntryHref = curr.getParam('href');
		
		this.entriesHref = curr.getParam('entriesHref');

		if (timeEntryHref) {
			this.fetchTimeEntry(timeEntryHref);
		}
		
		if (prev && prev.urlSegments[0]) {
			this.prevUrl = prev.urlSegments[0].segment;
			this.prevParams = prev.parameters;
		}
	}

	fetchTimeEntry(timeEntryHref: string) {
		this._timeEntryService.getTimeEntry(timeEntryHref).subscribe(
			(res) => this.timeEntry = res
			);
	}

	saveTimeEntry(timeEntry: TimeEntry) {
		console.log('save');
		console.log(this.entriesHref);
		this._timeEntryService.saveTimeEntry(timeEntry, this.entriesHref).subscribe(
			(res) => this.goBack()
		);
	}

	cancelEdit() {
		this.goBack();
	}

	goBack() {
		if (this.prevUrl) {
			this._router.navigate(['/' + this.prevUrl, this.prevParams]);
		} else {
			this._location.back();
		}
	}

}