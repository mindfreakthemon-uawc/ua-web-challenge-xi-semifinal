import { EventModel } from '../../events/models/event.model';
import { Moment } from 'moment';

export interface EventRangeDisplay {
	events: EventModel[];

	date: Moment;

	rangeStartOffset: number;
}
