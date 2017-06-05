import { Component } from '@angular/core';
import { PeriodGridComponent } from './period-grid.component';
import { Moment } from 'moment';
import { CalendarService } from '../calendar/services/calendar.service';
import { EventsService } from '../events/services/events.service';
import { EventRangeDisplay } from '../calendar/interfaces/event-range-display';

@Component({
	moduleId: module.id,
	selector: 'period-grid-month',
	templateUrl: 'tmpl/period-grid-month.html',
	styleUrls: ['styles/period-grid.css', 'styles/period-grid-month.css']
})
export class PeriodGridMonthComponent extends PeriodGridComponent {

	stream: EventRangeDisplay[][] = [];

	get rangeStart(): Moment {
		return this.calendarService.date.startOf('month').clone();
	}

	constructor(public calendarService: CalendarService,
	            public eventsService: EventsService) {
		super(calendarService, eventsService);
	}

	moveEvent(): void {
		// not implemented
	}

	createEvent(): void {
		// not implemented
	}

	editEndDateEvent(): void {
		// not implemented
	}

	reloadEvents(): void {
		const rangeStart = this.rangeStart;

		const stream: EventRangeDisplay[][] = [];
		const promises: Promise<any>[] = [];

		let days = this.getDaysRange(rangeStart);

		for (const [index, day] of days.entries()) {
			const week = Math.floor(index / 7);
			const localRangeStart = rangeStart.clone().add(day, 'days');
			const localRangeEnd = localRangeStart.clone().endOf('day');

			stream[week] = stream[week] || [];

			let promise = this.eventsService.getRangeList(localRangeStart, localRangeEnd)
				.then((events) => {
					stream[week].push({
						events,
						date: localRangeStart,
						rangeStartOffset: day
					})
				});

			promises.push(promise);
		}

		Promise.all(promises)
			.then(() => this.stream = stream);

	}
}
