import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarRouteComponent } from './calendar/calendar-route.component';
import { RootComponent } from '../common/root/root.component';

const routes: Routes = [
	{
		path: '',
		component: RootComponent,
		children: [
			{
				path: '',
				component: CalendarRouteComponent
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})
export class CalendarRoutingModule {
}
