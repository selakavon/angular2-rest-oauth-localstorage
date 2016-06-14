import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {TimeEntry} from '../type/time-entry';

import {DateRangeFilter} from '../type/date-range-filter';

import {AuthHttpService} from './auth-http.service';

@Injectable()
export class TimeEntryService {

	constructor(private _http: AuthHttpService) {}

	timeEntriesUrl: string = '';

	getTimeEntries(filter?: DateRangeFilter, entriesHref?: string): Observable<TimeEntry[]> {
		let href = entriesHref || this.timeEntriesUrl;
		
		return this._http.get(href, filter ? this.searchRequestOptions(filter) : null)
			.map((res) => this.timeEntriesFromJson(res.json().data))
			.catch(this.handleError);
	}

	getTimeEntry(timeEntryHref: string): Observable<TimeEntry> {
		return this._http.get(timeEntryHref)
			.map((res) => this.timeEntryFromJson(res.json()))
			.catch(this.handleError);
	}
	
	saveTimeEntry(timeEntry: TimeEntry, entriesHref?: string): Observable<TimeEntry> {
		console.log('save 2');
		console.log(entriesHref);
		if (timeEntry._links && timeEntry._links.self) {
			return this.putTimeEntry(timeEntry);
		}  else {
			return this.postTimeEntry(timeEntry, entriesHref);
		}
	}

	private putTimeEntry(timeEntry: TimeEntry): Observable<TimeEntry> {
		return this._http.put(timeEntry._links.self.href, JSON.stringify(timeEntry), this.jsonRequestOptions() )
			.map((res) => this.timeEntryFromJson(res.json()))
			.catch(this.handleError);		
	}

	private postTimeEntry(timeEntry: TimeEntry, entriesHref?: string): Observable<TimeEntry> {
		let href = entriesHref || this.timeEntriesUrl;
		
		console.log('save');
		console.log(entriesHref);
		
		return this._http.post(href, JSON.stringify(timeEntry), this.jsonRequestOptions())
			.map((res) => this.timeEntryFromJson(res.json()))
			.catch(this.handleError);		
	}
	
	private searchRequestOptions(filter: DateRangeFilter): RequestOptions {
		let search = new URLSearchParams();

		if (filter.dateFrom) {
			search.set('dateFrom', filter.dateFrom.toString());
		}

		if (filter.dateTo) {
			search.set('dateTo', filter.dateTo.toString());
		}

		let options = new RequestOptions({ search: search });

		return options;
	}

	private jsonRequestOptions(): RequestOptions {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return options;
	}

	timeEntriesFromJson(jsonArray: [any]): TimeEntry[] {
		let timeEntries = [];

		jsonArray.forEach(
			(json) => timeEntries.push(this.timeEntryFromJson(json))
		);

		return timeEntries;
	}

	timeEntryFromJson(json: any): TimeEntry {
		let timeEntry = new TimeEntry();
		
		timeEntry.date = parseInt(json.date, 10);
		timeEntry.distance = json.distance;
		timeEntry.timeSeconds = json.timeSeconds;
		timeEntry._links = json._links;

		return timeEntry;
	}

	handleError(error: Error) {

		return Observable.throw(error);

	}

	deleteTimeEntry(timeEntry: TimeEntry): Observable<void> {
		return this._http.delete(timeEntry._links.self.href)
			.catch(this.handleError);
	}

}