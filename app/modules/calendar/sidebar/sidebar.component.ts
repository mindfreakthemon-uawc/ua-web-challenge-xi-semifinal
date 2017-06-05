import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventModel } from '../events/models/event.model';
import * as moment from 'moment';
import { EventsService } from '../events/services/events.service';
import { VCALENDAR, VEVENT } from 'ics-js';

@Component({
	moduleId: module.id,
	selector: 'sidebar',
	templateUrl: 'tmpl/sidebar.html',
	styleUrls: ['styles/sidebar.css']
})
export class SidebarComponent {
	@Input()
	event: EventModel;

	@Output()
	remove: EventEmitter<any> = new EventEmitter();

	constructor(public eventsService: EventsService) {
	}

	setStartDate(value: string): void {
		if (!value) {
			return;
		}

		this.event.startDate = moment(value, 'YYYY-MM-DDTHH:mm');

		this.eventsService.update.next();
	}

	setEndDate(value: string): void {
		if (!value) {
			return;
		}

		this.event.endDate = moment(value, 'YYYY-MM-DDTHH:mm');

		this.eventsService.update.next();
	}

	downloadICS(): void {
		const calendar = new VCALENDAR();

		calendar.addProp('VERSION', 2);
		calendar.addProp('PRODID', 'XYZ Corp');

		const event = new VEVENT();

		event.addProp('UID');
		event.addProp('DTEND', this.event.endDate.toDate(), { VALUE: 'DATE-TIME' });
		event.addProp('DTSTART', this.event.startDate.toDate(), { VALUE: 'DATE-TIME' });
		event.addProp('DTSTAMP', moment().toDate(), { VALUE: 'DATE-TIME' });
		event.addProp('SUMMARY', this.event.title);

		calendar.addComponent(event);

		this.download('event.ics', calendar.toBlob())
	}

	download(filename: string, blob: Blob): void {
		const element = document.createElement('a');
		const url = URL.createObjectURL(blob);

		element.setAttribute('href', url);
		element.download = filename;

		element.click();
	}

}
