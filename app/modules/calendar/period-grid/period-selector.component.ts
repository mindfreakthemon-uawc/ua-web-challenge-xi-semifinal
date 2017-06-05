import { Component } from '@angular/core';
import { CalendarService } from '../calendar/services/calendar.service';

@Component({
	moduleId: module.id,
	selector: 'period-selector',
	templateUrl: 'tmpl/period-selector.html',
	styleUrls: ['styles/period-selector.css']
})
export class PeriodSelectorComponent {
	constructor(public calendarService: CalendarService) {

	}
}
