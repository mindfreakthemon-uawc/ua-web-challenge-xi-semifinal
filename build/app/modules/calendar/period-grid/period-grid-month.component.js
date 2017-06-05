"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const period_grid_component_1 = require("./period-grid.component");
const calendar_service_1 = require("../calendar/services/calendar.service");
const events_service_1 = require("../events/services/events.service");
let PeriodGridMonthComponent = class PeriodGridMonthComponent extends period_grid_component_1.PeriodGridComponent {
    constructor(calendarService, eventsService) {
        super(calendarService, eventsService);
        this.calendarService = calendarService;
        this.eventsService = eventsService;
        this.stream = [];
    }
    get rangeStart() {
        return this.calendarService.date.startOf('month').clone();
    }
    moveEvent() {
        // not implemented
    }
    createEvent() {
        // not implemented
    }
    editEndDateEvent() {
        // not implemented
    }
    reloadEvents() {
        const rangeStart = this.rangeStart;
        const stream = [];
        const promises = [];
        let days = this.getDaysRange(rangeStart);
        for (const [index, day] of days.entries()) {
            const week = Math.floor(index / 7);
            const localRangeStart = rangeStart.clone().add(day, 'days');
            const localRangeEnd = localRangeStart.clone().endOf('day');
            stream[week] = stream[week] || [];
            let promise = this.eventsService.getRangeList(localRangeStart, localRangeEnd)
                .then((events) => {
                stream[week].push({
                    events,
                    date: localRangeStart,
                    rangeStartOffset: day
                });
            });
            promises.push(promise);
        }
        Promise.all(promises)
            .then(() => this.stream = stream);
    }
};
PeriodGridMonthComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'period-grid-month',
        templateUrl: 'tmpl/period-grid-month.html',
        styleUrls: ['styles/period-grid.css', 'styles/period-grid-month.css']
    }),
    tslib_1.__metadata("design:paramtypes", [calendar_service_1.CalendarService,
        events_service_1.EventsService])
], PeriodGridMonthComponent);
exports.PeriodGridMonthComponent = PeriodGridMonthComponent;
