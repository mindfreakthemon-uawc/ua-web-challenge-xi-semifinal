import { EventEmitter, Injectable } from '@angular/core';
import * as moment from 'moment';
import { PeriodType } from '../../period-grid/enums/period-type.enum';
import { EventModel } from '../../events/models/event.model';
import { Moment } from 'moment';
import { EventDisplay } from '../interfaces/event-display';

@Injectable()
export class CalendarService {

	public readonly dateUpdate = new EventEmitter();

	protected _periodType: PeriodType = parseInt(localStorage.getItem('periodType') || '', 10) || PeriodType.DAY;

	protected _date: Moment = moment(localStorage.getItem('date') || undefined).set({
		hour: 0,
		minutes: 0,
		seconds: 0,
		milliseconds: 0
	});

	get date(): Moment {
		return this._date.clone();
	}

	set date(value: Moment) {
		this._date = value.set({
			hour: 0,
			minutes: 0,
			seconds: 0,
			milliseconds: 0
		});

		localStorage.setItem('date', this._date.toISOString());

		this.dateUpdate.next();
	}
	
	get now(): Moment {
		return moment();
	}

	get periodType(): PeriodType {
		return this._periodType;
	}

	set periodType(periodType: PeriodType) {
		this._periodType = periodType;

		localStorage.setItem('periodType', String(periodType));
	}

	get isPeriodTypeDay(): boolean {
		return this.periodType === PeriodType.DAY;
	}

	get isPeriodTypeWeek(): boolean {
		return this.periodType === PeriodType.WEEK;
	}

	get isPeriodTypeMonth(): boolean {
		return this.periodType === PeriodType.MONTH;
	}

	get isPeriodTypeYear(): boolean {
		return this.periodType === PeriodType.YEAR;
	}

	setPeriodTypeDay(): void {
		this.periodType = PeriodType.DAY;
	}

	setPeriodTypeWeek(): void {
		this.periodType = PeriodType.WEEK;
	}

	setPeriodTypeMonth(): void {
		this.periodType = PeriodType.MONTH;
	}

	setPeriodTypeYear(): void {
		this.periodType = PeriodType.YEAR;
	}

	getEventStream(events: EventModel[], rangeStart: Moment, rangeEnd: Moment): EventDisplay[] {
		let stream: EventDisplay[] = [];
		let lastDate = rangeStart;
		let diff = rangeEnd.diff(rangeStart, 'minutes');

		events.sort((eventA, eventB) => eventA.startDate.diff(eventB.startDate, 'minutes'));

		for (let nextEvent of events) {

			let lastDisplay = stream[stream.length - 1];
			let nextDisplay: EventDisplay = {
				p: 1,
				s: 1,
				f: 1,
				t: moment.max(nextEvent.startDate, rangeStart).diff(rangeStart, 'minutes') / diff,
				b: rangeEnd.diff(moment.min(nextEvent.endDate, rangeEnd), 'minutes') / diff,
				cluster: [],
				event: nextEvent
			};

			if (!lastDisplay || nextEvent.startDate.isAfter(lastDate, 'minutes')) {
				// next event is long after previous is finished or it is the first one - safe to add

				nextDisplay.cluster.push(nextDisplay);
			} else {
				// next event starts before previous one is finished

				let parallel = true;

				// share the same cluster
				nextDisplay.cluster = lastDisplay.cluster;

				// trying to fit current event under one of existing events in cluster
				for (let clusterDisplay of lastDisplay.cluster) {
					if (nextEvent.startDate.isAfter(clusterDisplay.event.endDate)) {
						// will be displayed under
						nextDisplay.s = clusterDisplay.s;
						nextDisplay.p = lastDisplay.p;
						nextDisplay.f = lastDisplay.p + 1 - clusterDisplay.s;

						parallel = false;
						break;
					}
				}

				nextDisplay.cluster.push(nextDisplay);

				if (parallel) {
					// take the next slot
					nextDisplay.s = lastDisplay.s + 1;

					// could not fit event under existing one in cluster - adding parallels
					for (let clusterDisplay of lastDisplay.cluster) {
						clusterDisplay.p = lastDisplay.cluster.length;
					}
				}
			}

			lastDate = moment.max(lastDate, nextEvent.endDate);

			stream.push(nextDisplay);
		}

		return stream;
	}

}
