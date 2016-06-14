import {Injectable} from '@angular/core';

@Injectable()
export class FormatterService {

	timeSecondsToString(timeSeconds: number): string {
		let seconds = timeSeconds;

		let hours = Math.floor(seconds / 3600);

		seconds %= 3600;

		let minutes = Math.floor(seconds / 60);

		seconds %= 60;

		return (hours > 0 ? hours + ':' : '') +
			this.paddedString(minutes) + ':' +
			this.paddedString(seconds);
	}

	private paddedString(num: number) {
		return (num < 10 ? '0' : '') + num;
	}

	dateToString(date: number, separator?: string) {
		if (!separator) {
			separator = '-';
		}

		if (!date) {
			return '';
		}

		let dateRemainder = date;

		let yyyy = Math.floor(dateRemainder / 10000);
		dateRemainder %= 10000;

		let mm = Math.floor(dateRemainder / 100);
		dateRemainder %= 100;

		let dd = dateRemainder;

		let dateString = yyyy + separator + (mm >= 10 ? mm : "0" + mm) + separator + (dd >= 10 ? dd : "0" + dd);
		
		return dateString;
	}

	dateToMillis(date: number): number {
		return new Date(this.dateToString(date)).getTime();
	}

	dateFromString(dateString: string): number {
		let date = new Date(dateString);

		return this.dateFromDateObject(date);
	}

	dateFromDateObject(dateObject: Date): number {
		return dateObject.getFullYear() * 10000
			+ (dateObject.getMonth() + 1) * 100
			+ dateObject.getDate();
	}

	secondsFromTimeString(timeString: string): number {
		let parts: string[] = timeString.split(':');

		let seconds = 0;

		parts.forEach((part) => {
			seconds *= 60;
			seconds += parseInt(part, 10);
		});

		return seconds;
	}

	currentDate(): number {
		return this.dateFromDateObject(new Date());
	}

}