import { Component } from '@angular/core';
import { CalendarService } from '../calendar/services/calendar.service';

@Component({
	moduleId: module.id,
	selector: 'period-display',
	templateUrl: 'tmpl/period-display.html',
	styleUrls: ['styles/period-display.css']
})
export class PeriodDisplayComponent {

	constructor(public calendarService: CalendarService) {

	}
}
