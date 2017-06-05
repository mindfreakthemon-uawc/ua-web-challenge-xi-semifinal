import { Component, Input } from '@angular/core';
import { EventModel } from './models/event.model';

@Component({
	moduleId: module.id,
	selector: 'event',
	templateUrl: 'tmpl/event.html',
	styleUrls: ['styles/event.css']
})
export class EventComponent {
	@Input()
	event: EventModel;
}
