"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const period_grid_component_1 = require("./period-grid.component");
const events_service_1 = require("../events/services/events.service");
const calendar_service_1 = require("../calendar/services/calendar.service");
let PeriodGridYearComponent = class PeriodGridYearComponent extends period_grid_component_1.PeriodGridComponent {
    constructor(calendarService, eventsService) {
        super(calendarService, eventsService);
        this.calendarService = calendarService;
        this.eventsService = eventsService;
    }
    get rangeStart() {
        return this.calendarService.date.startOf('year').clone();
    }
    moveEvent() {
        // not supported for year view
    }
    createEvent() {
        // not supported for year view
    }
    editEndDateEvent() {
        // not supported for year view
    }
    reloadEvents() {
        // not supported for year view
    }
};
PeriodGridYearComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'period-grid-year',
        templateUrl: 'tmpl/period-grid-year.html',
        styleUrls: ['styles/period-grid.css', 'styles/period-grid-year.css']
    }),
    tslib_1.__metadata("design:paramtypes", [calendar_service_1.CalendarService,
        events_service_1.EventsService])
], PeriodGridYearComponent);
exports.PeriodGridYearComponent = PeriodGridYearComponent;
