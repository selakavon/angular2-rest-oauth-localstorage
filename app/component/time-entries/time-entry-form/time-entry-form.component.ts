import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {ControlGroup, Control, FormBuilder, Validators} from '@angular/common';

import {TimeEntry} from '../../../type/time-entry';
import {TimeEntryFormModel} from './time-entry-form.model';

import {FormatterService} from '../../../service/formatter.service'; 

import {SelectOnFocusDirective} from '../../directive/select-on-focus.directive';

@Component({
    selector: ' time-entry-form',
    templateUrl: './app/component/time-entries/time-entry-form/time-entry-form.component.html',
    directives: [
    	SelectOnFocusDirective
	]
})
export class TimeEntryFormComponent implements OnInit {

	@Input() timeEntry: TimeEntry;

	@Output() onCancelForm = new EventEmitter<void>();
	
	@Output() onSubmitForm = new EventEmitter<TimeEntry>();

	mainForm: ControlGroup;

	get formModel(): TimeEntryFormModel {
		return {
			duration: this._formatterService.timeSecondsToString(this.timeEntry.timeSeconds || 0),
			date: this._formatterService.dateToString(this.timeEntry.date || this._formatterService.currentDate()),
			distance: this.timeEntry.distance || 0
		};
	}

	constructor(
		fb: FormBuilder,
		private _formatterService: FormatterService) { 

		this.mainForm = fb.group({
			'date': ['', Validators.required],
			'distance': ['', this.positiveNumberValidator],
			'duration': ['', Validators.compose([
				Validators.pattern('([0-9]?[0-9]:)?[0-9]?[0-9]:[0-9]?[0-9]'),
				this.positiveDurationValidator(this._formatterService)
				])]
		});

	}	

	ngOnInit() {

	}

	cancelForm() {
		this.onCancelForm.emit(null);
	}

	submitForm() {

		if (!this.mainForm.valid) {
			return;
		}

		let timeEntry = this.buildTimeEntry(this.mainForm.value);

		
		this.onSubmitForm.emit(timeEntry);
	}

	buildTimeEntry(formValue: TimeEntryFormModel): TimeEntry {
		let timeEntry = new TimeEntry();

		timeEntry.date = this._formatterService.dateFromString(formValue.date);
		timeEntry.timeSeconds = this._formatterService.secondsFromTimeString(formValue.duration);
		timeEntry.distance = formValue.distance;

		if (this.timeEntry._links) {
			timeEntry._links = this.timeEntry._links;
		}

		return timeEntry;
	}

	positiveNumberValidator(control: Control): {[s: string]: boolean} {
		if (!control.value || isNaN(control.value) ||  control.value <= 0) {
			return { positiveNumber: true };
		}

		return null;
	}

	positiveDurationValidator(formatterService: FormatterService) {
		return (control: Control): { [s: string]: boolean } => {
			if (!control.valid) {
				return null;
			}

			let timeSeconds = formatterService.secondsFromTimeString(control.value);

			if (timeSeconds <= 0) {
				return { positiveDuration: true };
			}

			return null;
		};
	}

}