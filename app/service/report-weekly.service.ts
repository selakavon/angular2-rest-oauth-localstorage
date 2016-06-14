import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {ReportWeek} from '../type/report-week';

import {AuthHttpService} from './auth-http.service';

@Injectable()
export class ReportWeeklyService {

	reportsUrl: string = '';

	constructor(private _http: AuthHttpService) { }

	getReports(): Observable<ReportWeek[]> {
		return this._http.get(this.reportsUrl)
			.map((res) => this.reportWeeksFromJson(res.json()))
			.catch(this.handleError);
	}

	getReport(href: string) {
		return this._http.get(href)
			.map((res) => this.reportWeekFromJson(res.json()))
			.catch(this.handleError);
	}

	reportWeeksFromJson(json: any): ReportWeek[] {
		
		let jsonWeeks = json.reportWeeks;

		let reportWeeks = [];

		jsonWeeks.forEach(
			(week) => reportWeeks.push(this.reportWeekFromJson(week))
		);

		return reportWeeks;
	}

	reportWeekFromJson(json: any): ReportWeek {

		let week = new ReportWeek();

		week.weekNumber = json.weekNumber;
		week.weekYear = json.weekYear;
		week.distanceSum = json.distanceSum;
		week.timeSecondsSum = json.timeSecondsSum;
		week.weekFirstDate = json.weekFirstDate;
		week.weekLastDate = json.weekLastDate;

		if (json.timeEntries) {
			week.timeEntries = json.timeEntries;
		}

		week._links = json._links;

		return week;
	}

	handleError(error: Error) {
		return Observable.throw(error);
	}

}
