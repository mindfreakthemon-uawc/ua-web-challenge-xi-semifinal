import { Injectable } from '@angular/core';
import { AbstractDataService } from '../../../common/services/abstract-data.service';
import { EventModel, RawEventModel } from '../models/event.model';
import * as moment from 'moment';
import { Moment } from 'moment';

@Injectable()
export class EventsService extends AbstractDataService<EventModel, RawEventModel> {

	createInstance(data: any): EventModel {
		let startDate = moment(data.startDate || data._startDate || data.date);
		let endDate = data.duration ? startDate.clone().add(data.duration, 'minutes') : moment(data.endDate || data._endDate);
		let event = new EventModel(data);

		startDate
			.seconds(0)
			.milliseconds(0);

		endDate
			.seconds(0)
			.milliseconds(0);

		event.startDate = startDate;
		event.endDate = endDate;

		return event;
	}

	getRangeList(rangeStart: Moment, rangeEnd: Moment): Promise<EventModel[]> {
		return this.getList()
			.then((events) => {
				return events.filter((event) => {
					return event.startDate.isBetween(rangeStart, rangeEnd, 'minutes', '[]')
						|| event.endDate.isBetween(rangeStart, rangeEnd, 'minutes', '[]')
						|| event.startDate.isBefore(rangeStart, 'minutes') && event.endDate.isAfter(rangeEnd, 'minutes');
				});
			});
	}

	save(): Promise<EventModel[]> {
		localStorage.setItem('events', JSON.stringify(this.cache));

		return Promise.resolve(this.cache);
	}

	sync(): Promise<RawEventModel[]> {
		let events: RawEventModel[] = [];
		let json = localStorage.getItem('events');

		try {
			if (json) {
				events = JSON.parse(json);
			}
		} catch (e) {
			// empty
		}

		return Promise.resolve(events);
	}
}
