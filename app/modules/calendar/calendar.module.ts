import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CalendarRoutingModule } from './calendar-routing.module';
import { EventsService } from './events/services/events.service';
import { CommonModule } from '../common/common.module';
import { CalendarRouteComponent } from './calendar/calendar-route.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventComponent } from './events/event.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PeriodDisplayComponent } from './period-grid/period-display.component';
import { PeriodSelectorComponent } from './period-grid/period-selector.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CalendarService } from './calendar/services/calendar.service';
import { PeriodGridDayComponent } from './period-grid/period-grid-day.component';
import { PeriodGridWeekComponent } from './period-grid/period-grid-week.component';
import { PeriodGridMonthComponent } from './period-grid/period-grid-month.component';
import { PeriodGridYearComponent } from './period-grid/period-grid-year.component';

@NgModule({
	imports: [
		CommonModule,
		CalendarRoutingModule,
		BrowserModule,
		FormsModule
	],

	declarations: [
		CalendarRouteComponent,
		CalendarComponent,
		EventComponent,
		NavigationComponent,
		PeriodDisplayComponent,
		PeriodGridDayComponent,
		PeriodGridWeekComponent,
		PeriodGridMonthComponent,
		PeriodGridYearComponent,
		PeriodSelectorComponent,
		SidebarComponent
	],

	providers: [
		EventsService,
		CalendarService
	]
})
export class CalendarModule {
}
