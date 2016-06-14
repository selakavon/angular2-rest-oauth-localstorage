import {Pipe, PipeTransform} from '@angular/core';

import {FormatterService} from '../../service/formatter.service';

@Pipe({name: 'timeFromSeconds'})
export class TimeFromSecondsPipe implements PipeTransform {

	constructor(private _formatterService: FormatterService) {

	}

	transform(timeSeconds: number) { 
		return this._formatterService.timeSecondsToString(timeSeconds);
	}

}