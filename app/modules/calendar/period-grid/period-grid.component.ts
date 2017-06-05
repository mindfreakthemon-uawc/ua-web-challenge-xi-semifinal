import { HostListener, OnInit } from '@angular/core';
import { EventModel } from '../events/models/event.model';
import { Throttle } from '../../../decorators/throttle.decorator';
import { CalendarService } from '../calendar/services/calendar.service';
import { EventsService } from '../events/services/events.service';
import { GridAction } from './enums/grid-action.enum';
import * as moment from 'moment';
import { Moment } from 'moment';
import { PeriodType } from './enums/period-type.enum';

export abstract class PeriodGridComponent implements OnInit {

	moment = moment;

	action: GridAction = GridAction.NONE;

	activeEvent: EventModel | null = null;

	activeMinute: number = 0;
	activeHour: number = 0;

	initActiveMinute: number = 0;
	initActiveHour: number = 0;

	abstract get rangeStart(): Moment;

	constructor(public calendarService: CalendarService,
	            public eventsService: EventsService) {
	}

	@Throttle()
	handleLineMouseMove(event: MouseEvent, hour: number, minute: number): void {

		switch (this.action) {
			case GridAction.CREATE:
				this.createEvent();
				this.setActiveDuration(hour, minute);

				break;

			case GridAction.EDIT_END_DATE:
				this.setActiveDuration(hour, minute);
				this.editEndDateEvent();

				break;

			case GridAction.CAPTURE:
				this.setInitialDuration(hour, minute);
				this.captureMove();

				break;

			case GridAction.MOVE:
				this.setActiveDuration(hour, minute);
				this.moveEvent();

				break;
		}
	}

	handleLineMouseDown(hour: number, minute: number): void {
		this.setActiveDuration(hour, minute);
		this.action = GridAction.CREATE;
		this.activeEvent = null;
	}

	handleEventMouseDown(event: EventModel): void {
		this.activeEvent = event;
		this.action = GridAction.CAPTURE;
	}

	@HostListener('window:mouseup', [])
	handleWindowMouseUp(): void {
		this.action = GridAction.NONE;
	}


	setActiveDuration(hour: number, minute: number): void {
		this.activeMinute = minute;
		this.activeHour = hour;
	}

	setInitialDuration(hour: number, minute: number): void {
		this.initActiveMinute = minute;
		this.initActiveHour = hour;
	}

	captureMove(): void {
		this.action = GridAction.MOVE;
	}

	removeEvent(): void {
		if (!this.activeEvent) {
			return;
		}

		this.eventsService.remove(this.activeEvent);
		this.activeEvent = null;
	}

	/**
	 * helper
	 */
	createArray(number: number): number[] {
		return Array.from(Array(number).keys())
	}

	/**
	 * helper
	 */
	getDaysRange(rangeStart: Moment): number[] {
		const rangeEnd = rangeStart.clone().endOf('month');
		const daysInMonth = rangeStart.daysInMonth();
		const rangeStartISOWeekday = rangeStart.isoWeekday();
		const rangeEndISOWeekday = rangeEnd.isoWeekday();

		return [
			...this.createArray(rangeStartISOWeekday).map((number) => -number).reverse().slice(0, -1),
			...this.createArray(daysInMonth),
			...this.createArray(7 - rangeEndISOWeekday).map((number) => number + daysInMonth)
		];
	}

	showDate(day: number, month: number = 0): void {
		let date = this.rangeStart.clone()
			.add(month, 'months')
			.add(day, 'days');

		this.calendarService.periodType = PeriodType.DAY;
		this.calendarService.date = date;
	}

	showMonth(months: number = 0): void {
		let date = this.rangeStart.clone()
			.add(months, 'months');

		this.calendarService.periodType = PeriodType.MONTH;
		this.calendarService.date = date;
	}

	abstract moveEvent(): void;

	abstract createEvent(): void;

	abstract editEndDateEvent(): void;

	abstract reloadEvents(): void;

	ngOnInit(): void {
		this.reloadEvents();

		this.eventsService.update
			.subscribe(() => this.reloadEvents());

		this.calendarService.dateUpdate
			.subscribe(() => this.reloadEvents());
	}
}
