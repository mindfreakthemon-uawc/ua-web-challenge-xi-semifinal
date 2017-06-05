import { Component } from '@angular/core';
import { PeriodGridComponent } from './period-grid.component';
import { Moment } from 'moment';
import { EventsService } from '../events/services/events.service';
import { CalendarService } from '../calendar/services/calendar.service';

@Component({
	moduleId: module.id,
	selector: 'period-grid-year',
	templateUrl: 'tmpl/period-grid-year.html',
	styleUrls: ['styles/period-grid.css', 'styles/period-grid-year.css']
})
export class PeriodGridYearComponent extends PeriodGridComponent {

	get rangeStart(): Moment {
		return this.calendarService.date.startOf('year').clone();
	}

	constructor(public calendarService: CalendarService,
	            public eventsService: EventsService) {
		super(calendarService, eventsService);
	}

	moveEvent(): void {
		// not supported for year view
	}

	createEvent(): void {
		// not supported for year view
	}

	editEndDateEvent(): void {
		// not supported for year view
	}

	reloadEvents(): void {
		// not supported for year view
	}
}
