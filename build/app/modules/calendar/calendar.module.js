"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const calendar_routing_module_1 = require("./calendar-routing.module");
const events_service_1 = require("./events/services/events.service");
const common_module_1 = require("../common/common.module");
const calendar_route_component_1 = require("./calendar/calendar-route.component");
const calendar_component_1 = require("./calendar/calendar.component");
const event_component_1 = require("./events/event.component");
const navigation_component_1 = require("./navigation/navigation.component");
const period_display_component_1 = require("./period-grid/period-display.component");
const period_selector_component_1 = require("./period-grid/period-selector.component");
const sidebar_component_1 = require("./sidebar/sidebar.component");
const calendar_service_1 = require("./calendar/services/calendar.service");
const period_grid_day_component_1 = require("./period-grid/period-grid-day.component");
const period_grid_week_component_1 = require("./period-grid/period-grid-week.component");
const period_grid_month_component_1 = require("./period-grid/period-grid-month.component");
const period_grid_year_component_1 = require("./period-grid/period-grid-year.component");
let CalendarModule = class CalendarModule {
};
CalendarModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [
            common_module_1.CommonModule,
            calendar_routing_module_1.CalendarRoutingModule,
            platform_browser_1.BrowserModule,
            forms_1.FormsModule
        ],
        declarations: [
            calendar_route_component_1.CalendarRouteComponent,
            calendar_component_1.CalendarComponent,
            event_component_1.EventComponent,
            navigation_component_1.NavigationComponent,
            period_display_component_1.PeriodDisplayComponent,
            period_grid_day_component_1.PeriodGridDayComponent,
            period_grid_week_component_1.PeriodGridWeekComponent,
            period_grid_month_component_1.PeriodGridMonthComponent,
            period_grid_year_component_1.PeriodGridYearComponent,
            period_selector_component_1.PeriodSelectorComponent,
            sidebar_component_1.SidebarComponent
        ],
        providers: [
            events_service_1.EventsService,
            calendar_service_1.CalendarService
        ]
    })
], CalendarModule);
exports.CalendarModule = CalendarModule;
