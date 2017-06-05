"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const events_service_1 = require("../events/services/events.service");
const calendar_service_1 = require("./services/calendar.service");
let CalendarComponent = class CalendarComponent {
    constructor(eventsService, calendarService) {
        this.eventsService = eventsService;
        this.calendarService = calendarService;
        this.events = [];
    }
    ngOnInit() {
        this.eventsService.getList()
            .then((events) => this.events = events);
    }
};
CalendarComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'calendar',
        templateUrl: 'tmpl/calendar.html',
        styleUrls: ['styles/calendar.css']
    }),
    tslib_1.__metadata("design:paramtypes", [events_service_1.EventsService,
        calendar_service_1.CalendarService])
], CalendarComponent);
exports.CalendarComponent = CalendarComponent;
