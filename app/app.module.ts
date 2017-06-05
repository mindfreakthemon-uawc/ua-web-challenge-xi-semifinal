import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RootComponent } from './root/root.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from './modules/common/common.module';
import { CalendarModule } from './modules/calendar/calendar.module';

@NgModule({
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		CommonModule,
		CalendarModule
	],

	declarations: [
		RootComponent
	],

	bootstrap: [
		RootComponent
	]
})
export class AppModule {
}
