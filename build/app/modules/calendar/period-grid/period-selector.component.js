"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const calendar_service_1 = require("../calendar/services/calendar.service");
let PeriodSelectorComponent = class PeriodSelectorComponent {
    constructor(calendarService) {
        this.calendarService = calendarService;
    }
};
PeriodSelectorComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'period-selector',
        templateUrl: 'tmpl/period-selector.html',
        styleUrls: ['styles/period-selector.css']
    }),
    tslib_1.__metadata("design:paramtypes", [calendar_service_1.CalendarService])
], PeriodSelectorComponent);
exports.PeriodSelectorComponent = PeriodSelectorComponent;
