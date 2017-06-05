"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const period_grid_component_1 = require("./period-grid.component");
const calendar_service_1 = require("../calendar/services/calendar.service");
const events_service_1 = require("../events/services/events.service");
let PeriodGridWeekComponent = class PeriodGridWeekComponent extends period_grid_component_1.PeriodGridComponent {
    constructor(calendarService, eventsService) {
        super(calendarService, eventsService);
        this.calendarService = calendarService;
        this.eventsService = eventsService;
        this.stream = [];
    }
    get rangeStart() {
        return this.calendarService.date.startOf('isoWeek').clone();
    }
    moveEvent() {
    }
    createEvent() {
    }
    editEndDateEvent() {
    }
    reloadEvents() {
        const rangeStart = this.rangeStart;
        const streams = [];
        const promises = [];
        for (let day of this.createArray(7)) {
            let localRangeStart = rangeStart.clone().add(day, 'days');
            let localRangeEnd = localRangeStart.clone().endOf('day');
            let promise = this.eventsService.getRangeList(localRangeStart, localRangeEnd)
                .then((events) => this.calendarService.getEventStream(events, localRangeStart, localRangeEnd))
                .then((stream) => streams.push(stream));
            promises.push(promise);
        }
        Promise.all(promises)
            .then(() => this.stream = streams);
    }
};
PeriodGridWeekComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'period-grid-week',
        templateUrl: 'tmpl/period-grid-week.html',
        styleUrls: ['styles/period-grid.css', 'styles/period-grid-week.css']
    }),
    tslib_1.__metadata("design:paramtypes", [calendar_service_1.CalendarService,
        events_service_1.EventsService])
], PeriodGridWeekComponent);
exports.PeriodGridWeekComponent = PeriodGridWeekComponent;
