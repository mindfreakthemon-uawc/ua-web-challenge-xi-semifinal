"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const moment = require("moment");
const grid_action_enum_1 = require("./enums/grid-action.enum");
const period_grid_component_1 = require("./period-grid.component");
const calendar_service_1 = require("../calendar/services/calendar.service");
const events_service_1 = require("../events/services/events.service");
let PeriodGridDayComponent = class PeriodGridDayComponent extends period_grid_component_1.PeriodGridComponent {
    constructor(calendarService, eventsService) {
        super(calendarService, eventsService);
        this.calendarService = calendarService;
        this.eventsService = eventsService;
        this.stream = [];
    }
    get rangeStart() {
        return this.calendarService.date.startOf('day').clone();
    }
    get rangeEnd() {
        return this.calendarService.date.endOf('day');
    }
    moveEvent() {
        if (!this.activeEvent) {
            return;
        }
        let initialDuration = moment.duration({
            hours: this.initActiveHour,
            minutes: this.initActiveMinute
        });
        let activeDuration = moment.duration({
            hours: this.activeHour,
            minutes: this.activeMinute
        });
        this.setInitialDuration(this.activeHour, this.activeMinute);
        let delta = activeDuration.subtract(initialDuration).as('minutes');
        this.activeEvent.startDate
            .add(delta, 'minutes');
        this.activeEvent.endDate
            .add(delta, 'minutes');
        this.eventsService.save();
        this.reloadEvents();
    }
    createEvent() {
        let date = this.rangeStart;
        date.set({ hours: this.activeHour, minutes: this.activeMinute });
        let event = this.eventsService.createInstance({
            startDate: date,
            endDate: date.clone()
        });
        this.activeEvent = event;
        this.action = grid_action_enum_1.GridAction.EDIT_END_DATE;
        this.eventsService.add(event);
    }
    editEndDateEvent() {
        if (this.activeEvent === null) {
            return;
        }
        let endDate = this.activeEvent.endDate.clone();
        endDate.set({ hours: this.activeHour, minutes: this.activeMinute });
        if (this.activeEvent.startDate.isSameOrAfter(endDate)) {
            endDate = this.activeEvent.startDate.clone();
        }
        this.activeEvent.endDate = endDate;
        this.eventsService.save();
        this.reloadEvents();
    }
    reloadEvents() {
        this.eventsService.getRangeList(this.rangeStart, this.rangeEnd)
            .then((events) => this.calendarService.getEventStream(events, this.rangeStart, this.rangeEnd))
            .then((stream) => this.stream = stream);
    }
};
PeriodGridDayComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'period-grid-day',
        templateUrl: 'tmpl/period-grid-day.html',
        styleUrls: ['styles/period-grid.css', 'styles/period-grid-day.css']
    }),
    tslib_1.__metadata("design:paramtypes", [calendar_service_1.CalendarService,
        events_service_1.EventsService])
], PeriodGridDayComponent);
exports.PeriodGridDayComponent = PeriodGridDayComponent;
