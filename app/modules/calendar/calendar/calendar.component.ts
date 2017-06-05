import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events/services/events.service';
import { EventModel } from '../events/models/event.model';
import { CalendarService } from './services/calendar.service';

@Component({
	moduleId: module.id,
	selector: 'calendar',
	templateUrl: 'tmpl/calendar.html',
	styleUrls: ['styles/calendar.css']
})
export class CalendarComponent implements OnInit {
	events: EventModel[] = [];

	constructor(public eventsService: EventsService,
				public calendarService: CalendarService) {
	}

	ngOnInit(): void {
		this.eventsService.getList()
			.then((events) => this.events = events);
	}
}
