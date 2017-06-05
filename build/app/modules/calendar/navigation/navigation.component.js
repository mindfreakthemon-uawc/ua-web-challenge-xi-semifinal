"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const calendar_service_1 = require("../calendar/services/calendar.service");
const period_type_enum_1 = require("../period-grid/enums/period-type.enum");
const moment = require("moment");
let NavigationComponent = class NavigationComponent {
    constructor(calendarService) {
        this.calendarService = calendarService;
    }
    setPreviousRange() {
        let currentDate = this.calendarService.date;
        switch (this.calendarService.periodType) {
            case period_type_enum_1.PeriodType.DAY:
                currentDate.subtract(1, 'days');
                break;
            case period_type_enum_1.PeriodType.WEEK:
                currentDate.subtract(7, 'days');
                break;
            case period_type_enum_1.PeriodType.MONTH:
                currentDate.subtract(1, 'month');
                break;
            case period_type_enum_1.PeriodType.YEAR:
                currentDate.subtract(1, 'year');
                break;
        }
        this.calendarService.date = currentDate;
    }
    setNextRange() {
        let currentDate = this.calendarService.date;
        switch (this.calendarService.periodType) {
            case period_type_enum_1.PeriodType.DAY:
                currentDate.add(1, 'days');
                break;
            case period_type_enum_1.PeriodType.WEEK:
                currentDate.add(7, 'days');
                break;
            case period_type_enum_1.PeriodType.MONTH:
                currentDate.add(1, 'month');
                break;
            case period_type_enum_1.PeriodType.YEAR:
                currentDate.add(1, 'year');
                break;
        }
        this.calendarService.date = currentDate;
    }
    setTodayRange() {
        this.calendarService.date = moment();
    }
};
NavigationComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'navigation',
        templateUrl: 'tmpl/navigation.html',
        styleUrls: ['styles/navigation.css']
    }),
    tslib_1.__metadata("design:paramtypes", [calendar_service_1.CalendarService])
], NavigationComponent);
exports.NavigationComponent = NavigationComponent;
