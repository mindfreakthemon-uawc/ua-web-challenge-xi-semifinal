import { Component, OnInit } from '@angular/core';
import { EventModel } from '../events/models/event.model';
import * as moment from 'moment';
import { Moment } from 'moment';
import { EventDisplay } from '../calendar/interfaces/event-display';
import { GridAction } from './enums/grid-action.enum';
import { PeriodGridComponent } from './period-grid.component';
import { CalendarService } from '../calendar/services/calendar.service';
import { EventsService } from '../events/services/events.service';

@Component({
	moduleId: module.id,
	selector: 'period-grid-day',
	templateUrl: 'tmpl/period-grid-day.html',
	styleUrls: ['styles/period-grid.css', 'styles/period-grid-day.css']
})
export class PeriodGridDayComponent extends PeriodGridComponent implements OnInit {

	stream: EventDisplay[] = [];

	get rangeStart(): Moment {
		return this.calendarService.date.startOf('day').clone();
	}

	get rangeEnd(): Moment {
		return this.calendarService.date.endOf('day');
	}

	constructor(public calendarService: CalendarService,
	            public eventsService: EventsService) {
		super(calendarService, eventsService);
	}

	moveEvent(): void {
		if (!this.activeEvent) {
			return;
		}

		let initialDuration = moment.duration({
			hours: this.initActiveHour,
			minutes: this.initActiveMinute
		});

		let activeDuration = moment.duration({
			hours: this.activeHour,
			minutes: this.activeMinute
		});

		this.setInitialDuration(this.activeHour, this.activeMinute);

		let delta = activeDuration.subtract(initialDuration).as('minutes');

		this.activeEvent.startDate
			.add(delta, 'minutes');

		this.activeEvent.endDate
			.add(delta, 'minutes');

		this.eventsService.save();

		this.reloadEvents();
	}

	createEvent(): void {
		let date = this.rangeStart;

		date.set({ hours: this.activeHour, minutes: this.activeMinute });

		let event = this.eventsService.createInstance({
			startDate: date,
			endDate: date.clone()
		});

		this.activeEvent = event;
		this.action = GridAction.EDIT_END_DATE;

		this.eventsService.add(event);
	}

	editEndDateEvent(): void {
		if (this.activeEvent === null) {
			return;
		}

		let endDate = this.activeEvent.endDate.clone();

		endDate.set({ hours: this.activeHour, minutes: this.activeMinute });

		if (this.activeEvent.startDate.isSameOrAfter(endDate)) {
			endDate = this.activeEvent.startDate.clone();
		}

		this.activeEvent.endDate = endDate;

		this.eventsService.save();

		this.reloadEvents();
	}

	reloadEvents(): void {
		this.eventsService.getRangeList(this.rangeStart, this.rangeEnd)
			.then((events) => this.calendarService.getEventStream(events, this.rangeStart, this.rangeEnd))
			.then((stream) => this.stream = stream);
	}
}
