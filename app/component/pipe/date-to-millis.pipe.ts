import {Pipe, PipeTransform} from '@angular/core';

import {FormatterService} from '../../service/formatter.service';

@Pipe({name: 'dateToMillis'})
export class DateToMillisPipe implements PipeTransform {

	constructor(private _formatterService: FormatterService) {

	}

	transform(date: number) { 
		return this._formatterService.dateToMillis(date);
	}

}