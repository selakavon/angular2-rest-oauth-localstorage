import {TimeEntry} from './time-entry';
import {Links} from './links';

export class ReportWeek {
	weekNumber: number;
	weekYear: number;
	distanceSum: number;
	timeSecondsSum: number;
	weekFirstDate: number;
	weekLastDate: number;

	get averageSpeed() {
		return this.distanceSum * 3600 / this.timeSecondsSum;
	}

	timeEntries: TimeEntry[];

	_links: Links;

}