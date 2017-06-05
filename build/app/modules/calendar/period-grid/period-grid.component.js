"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const throttle_decorator_1 = require("../../../decorators/throttle.decorator");
const grid_action_enum_1 = require("./enums/grid-action.enum");
const moment = require("moment");
const period_type_enum_1 = require("./enums/period-type.enum");
class PeriodGridComponent {
    constructor(calendarService, eventsService) {
        this.calendarService = calendarService;
        this.eventsService = eventsService;
        this.moment = moment;
        this.action = grid_action_enum_1.GridAction.NONE;
        this.activeEvent = null;
        this.activeMinute = 0;
        this.activeHour = 0;
        this.initActiveMinute = 0;
        this.initActiveHour = 0;
    }
    handleLineMouseMove(event, hour, minute) {
        switch (this.action) {
            case grid_action_enum_1.GridAction.CREATE:
                this.createEvent();
                this.setActiveDuration(hour, minute);
                break;
            case grid_action_enum_1.GridAction.EDIT_END_DATE:
                this.setActiveDuration(hour, minute);
                this.editEndDateEvent();
                break;
            case grid_action_enum_1.GridAction.CAPTURE:
                this.setInitialDuration(hour, minute);
                this.captureMove();
                break;
            case grid_action_enum_1.GridAction.MOVE:
                this.setActiveDuration(hour, minute);
                this.moveEvent();
                break;
        }
    }
    handleLineMouseDown(hour, minute) {
        this.setActiveDuration(hour, minute);
        this.action = grid_action_enum_1.GridAction.CREATE;
        this.activeEvent = null;
    }
    handleEventMouseDown(event) {
        this.activeEvent = event;
        this.action = grid_action_enum_1.GridAction.CAPTURE;
    }
    handleWindowMouseUp() {
        this.action = grid_action_enum_1.GridAction.NONE;
    }
    setActiveDuration(hour, minute) {
        this.activeMinute = minute;
        this.activeHour = hour;
    }
    setInitialDuration(hour, minute) {
        this.initActiveMinute = minute;
        this.initActiveHour = hour;
    }
    captureMove() {
        this.action = grid_action_enum_1.GridAction.MOVE;
    }
    removeEvent() {
        if (!this.activeEvent) {
            return;
        }
        this.eventsService.remove(this.activeEvent);
        this.activeEvent = null;
    }
    /**
     * helper
     */
    createArray(number) {
        return Array.from(Array(number).keys());
    }
    /**
     * helper
     */
    getDaysRange(rangeStart) {
        const rangeEnd = rangeStart.clone().endOf('month');
        const daysInMonth = rangeStart.daysInMonth();
        const rangeStartISOWeekday = rangeStart.isoWeekday();
        const rangeEndISOWeekday = rangeEnd.isoWeekday();
        return [
            ...this.createArray(rangeStartISOWeekday).map((number) => -number).reverse().slice(0, -1),
            ...this.createArray(daysInMonth),
            ...this.createArray(7 - rangeEndISOWeekday).map((number) => number + daysInMonth)
        ];
    }
    showDate(day, month = 0) {
        let date = this.rangeStart.clone()
            .add(month, 'months')
            .add(day, 'days');
        this.calendarService.periodType = period_type_enum_1.PeriodType.DAY;
        this.calendarService.date = date;
    }
    showMonth(months = 0) {
        let date = this.rangeStart.clone()
            .add(months, 'months');
        this.calendarService.periodType = period_type_enum_1.PeriodType.MONTH;
        this.calendarService.date = date;
    }
    ngOnInit() {
        this.reloadEvents();
        this.eventsService.update
            .subscribe(() => this.reloadEvents());
        this.calendarService.dateUpdate
            .subscribe(() => this.reloadEvents());
    }
}
tslib_1.__decorate([
    throttle_decorator_1.Throttle(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [MouseEvent, Number, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], PeriodGridComponent.prototype, "handleLineMouseMove", null);
tslib_1.__decorate([
    core_1.HostListener('window:mouseup', []),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PeriodGridComponent.prototype, "handleWindowMouseUp", null);
exports.PeriodGridComponent = PeriodGridComponent;
