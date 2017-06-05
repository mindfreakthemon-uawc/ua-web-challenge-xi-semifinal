import { EventModel } from '../../events/models/event.model';

export interface EventDisplay {
	p: number;
	s: number;
	f: number;
	t: number;
	b: number;
	cluster: EventDisplay[];
	event: EventModel;
}