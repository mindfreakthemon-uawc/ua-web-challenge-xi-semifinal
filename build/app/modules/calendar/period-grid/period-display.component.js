"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const calendar_service_1 = require("../calendar/services/calendar.service");
let PeriodDisplayComponent = class PeriodDisplayComponent {
    constructor(calendarService) {
        this.calendarService = calendarService;
    }
};
PeriodDisplayComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'period-display',
        templateUrl: 'tmpl/period-display.html',
        styleUrls: ['styles/period-display.css']
    }),
    tslib_1.__metadata("design:paramtypes", [calendar_service_1.CalendarService])
], PeriodDisplayComponent);
exports.PeriodDisplayComponent = PeriodDisplayComponent;
