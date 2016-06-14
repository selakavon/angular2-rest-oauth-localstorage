import {Component, Input, Output, EventEmitter} from '@angular/core';

import {TimeFromSecondsPipe} from '../../pipe/time-from-seconds.pipe';
import {DateToMillisPipe} from '../../pipe/date-to-millis.pipe';
import {ReportWeek} from '../../../type/report-week';

@Component({
	selector: '[reportWeekRow]',
		templateUrl: './app/component/report/report-weekly-table/report-week-row.component.html',
			pipes: [
				TimeFromSecondsPipe,
				DateToMillisPipe
			]
})
export class ReportWeekRowComponent {

	@Input('reportWeekRow') reportWeek: ReportWeek;

	@Output('onExpand') onExpand = new EventEmitter<void>();
	
	@Output('onCollapse') onCollapse = new EventEmitter<void>();

	expand() {
		this.onExpand.emit(null);
	}

	collapse() {
		this.onCollapse.emit(null);
	}

}