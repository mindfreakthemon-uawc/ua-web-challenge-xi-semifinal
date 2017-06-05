import { Component } from '@angular/core';
import { CalendarService } from '../calendar/services/calendar.service';
import { PeriodType } from '../period-grid/enums/period-type.enum';
import * as moment from 'moment';

@Component({
	moduleId: module.id,
	selector: 'navigation',
	templateUrl: 'tmpl/navigation.html',
	styleUrls: ['styles/navigation.css']
})
export class NavigationComponent {

	constructor(public calendarService: CalendarService) {

	}

	setPreviousRange(): void {
		let currentDate = this.calendarService.date;

		switch (this.calendarService.periodType) {
			case PeriodType.DAY:
				currentDate.subtract(1, 'days');
				break;
			case PeriodType.WEEK:
				currentDate.subtract(7, 'days');
				break;
			case PeriodType.MONTH:
				currentDate.subtract(1, 'month');
				break;
			case PeriodType.YEAR:
				currentDate.subtract(1, 'year');
				break;
		}

		this.calendarService.date = currentDate;

	}

	setNextRange(): void {
		let currentDate = this.calendarService.date;

		switch (this.calendarService.periodType) {
			case PeriodType.DAY:
				currentDate.add(1, 'days');
				break;
			case PeriodType.WEEK:
				currentDate.add(7, 'days');
				break;
			case PeriodType.MONTH:
				currentDate.add(1, 'month');
				break;
			case PeriodType.YEAR:
				currentDate.add(1, 'year');
				break;
		}

		this.calendarService.date = currentDate;
	}

	setTodayRange(): void {
		this.calendarService.date = moment();
	}

}
