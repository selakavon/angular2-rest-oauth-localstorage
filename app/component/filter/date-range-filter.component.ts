import {Component, Input, Output, EventEmitter} from '@angular/core';

import {FormBuilder, ControlGroup, Validators} from '@angular/common';

import {FormatterService} from '../../service/formatter.service';

import {DateRangeFilter} from '../../type/date-range-filter';
import {DateRangeFormModel} from './date-range-form-model';

@Component({
	selector: 'date-range-filter',
	templateUrl: './app/component/filter/date-range-filter.component.html'
})
export class DateRangeFilterComponent {

	@Input('filter') dateRangeFilter: DateRangeFilter;

	@Output() onSearch = new EventEmitter<DateRangeFilter>();

	mainForm: ControlGroup;

	get formModel(): DateRangeFormModel { 
		return {
			dateFrom: this._formatterService.dateToString(this.dateRangeFilter.dateFrom || null),
			dateTo: this._formatterService.dateToString(this.dateRangeFilter.dateTo || null)
		};
	}

	constructor(
		fb: FormBuilder,
		private _formatterService: FormatterService
		) {

		this.mainForm = fb.group({
			'dateFrom': [''],
			'dateTo': ['']
		});

	}

	submitForm() {
		let filter = this.buildFilter(this.mainForm.value);

		this.onSearch.emit(filter);
	}

	buildFilter(formModel: DateRangeFormModel): DateRangeFilter {
		let filter = new DateRangeFilter();

		if (formModel.dateFrom) {
			filter.dateFrom = this._formatterService.dateFromString(formModel.dateFrom);
		}
		
		if (formModel.dateTo) {
			filter.dateTo = this._formatterService.dateFromString(formModel.dateTo);
		}

		return filter;
	}

}