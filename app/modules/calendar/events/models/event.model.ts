import * as moment from 'moment';
import { Moment } from 'moment';

export interface RawEventModel {
	title?: string;

	description?: string;
}


export class EventModel {
	public title: string;

	public description: string;

	private _startDate: Moment;

	private _endDate: Moment;

	constructor({ title = 'New Event', description = '' }: RawEventModel = {}) {
		this.title = title;
		this.description = description;
	}

	get startDate(): Moment {
		return this._startDate;
	}

	set startDate(value: Moment) {
		this._startDate = value;
	}

	get endDate(): Moment {
		return this._endDate;
	}

	set endDate(value: Moment) {
		this._endDate = value;
	}
}