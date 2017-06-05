import { Component, OnInit } from '@angular/core';
import { EventModel } from '../events/models/event.model';
import { EventDisplay } from '../calendar/interfaces/event-display';
import { Moment } from 'moment';
import { PeriodGridComponent } from './period-grid.component';
import { PeriodType } from './enums/period-type.enum';
import { CalendarService } from '../calendar/services/calendar.service';
import { EventsService } from '../events/services/events.service';

@Component({
	moduleId: module.id,
	selector: 'period-grid-week',
	templateUrl: 'tmpl/period-grid-week.html',
	styleUrls: ['styles/period-grid.css', 'styles/period-grid-week.css']
})
export class PeriodGridWeekComponent extends PeriodGridComponent implements OnInit {

	stream: EventDisplay[][] = [];

	get rangeStart(): Moment {
		return this.calendarService.date.startOf('isoWeek').clone();
	}

	constructor(public calendarService: CalendarService,
	            public eventsService: EventsService) {
		super(calendarService, eventsService);
	}

	moveEvent(): void {
	}

	createEvent(): void {
	}

	editEndDateEvent(): void {
	}

	reloadEvents(): void {
		const rangeStart = this.rangeStart;

		const streams: EventDisplay[][] = [];
		const promises: Promise<any>[] = [];

		for (let day of this.createArray(7)) {
			let localRangeStart = rangeStart.clone().add(day, 'days');
			let localRangeEnd = localRangeStart.clone().endOf('day');

			let promise = this.eventsService.getRangeList(localRangeStart, localRangeEnd)
				.then((events) =>  this.calendarService.getEventStream(events, localRangeStart, localRangeEnd))
				.then((stream) => streams.push(stream));

			promises.push(promise);
		}

		Promise.all(promises)
			.then(() => this.stream = streams);
	}

}
