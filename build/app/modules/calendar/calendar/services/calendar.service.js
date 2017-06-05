"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const moment = require("moment");
const period_type_enum_1 = require("../../period-grid/enums/period-type.enum");
let CalendarService = class CalendarService {
    constructor() {
        this.dateUpdate = new core_1.EventEmitter();
        this._periodType = parseInt(localStorage.getItem('periodType') || '', 10) || period_type_enum_1.PeriodType.DAY;
        this._date = moment(localStorage.getItem('date') || undefined).set({
            hour: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
        });
    }
    get date() {
        return this._date.clone();
    }
    set date(value) {
        this._date = value.set({
            hour: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
        });
        localStorage.setItem('date', this._date.toISOString());
        this.dateUpdate.next();
    }
    get now() {
        return moment();
    }
    get periodType() {
        return this._periodType;
    }
    set periodType(periodType) {
        this._periodType = periodType;
        localStorage.setItem('periodType', String(periodType));
    }
    get isPeriodTypeDay() {
        return this.periodType === period_type_enum_1.PeriodType.DAY;
    }
    get isPeriodTypeWeek() {
        return this.periodType === period_type_enum_1.PeriodType.WEEK;
    }
    get isPeriodTypeMonth() {
        return this.periodType === period_type_enum_1.PeriodType.MONTH;
    }
    get isPeriodTypeYear() {
        return this.periodType === period_type_enum_1.PeriodType.YEAR;
    }
    setPeriodTypeDay() {
        this.periodType = period_type_enum_1.PeriodType.DAY;
    }
    setPeriodTypeWeek() {
        this.periodType = period_type_enum_1.PeriodType.WEEK;
    }
    setPeriodTypeMonth() {
        this.periodType = period_type_enum_1.PeriodType.MONTH;
    }
    setPeriodTypeYear() {
        this.periodType = period_type_enum_1.PeriodType.YEAR;
    }
    getEventStream(events, rangeStart, rangeEnd) {
        let stream = [];
        let lastDate = rangeStart;
        let diff = rangeEnd.diff(rangeStart, 'minutes');
        events.sort((eventA, eventB) => eventA.startDate.diff(eventB.startDate, 'minutes'));
        for (let nextEvent of events) {
            let lastDisplay = stream[stream.length - 1];
            let nextDisplay = {
                p: 1,
                s: 1,
                f: 1,
                t: moment.max(nextEvent.startDate, rangeStart).diff(rangeStart, 'minutes') / diff,
                b: rangeEnd.diff(moment.min(nextEvent.endDate, rangeEnd), 'minutes') / diff,
                cluster: [],
                event: nextEvent
            };
            if (!lastDisplay || nextEvent.startDate.isAfter(lastDate, 'minutes')) {
                // next event is long after previous is finished or it is the first one - safe to add
                nextDisplay.cluster.push(nextDisplay);
            }
            else {
                // next event starts before previous one is finished
                let parallel = true;
                // share the same cluster
                nextDisplay.cluster = lastDisplay.cluster;
                // trying to fit current event under one of existing events in cluster
                for (let clusterDisplay of lastDisplay.cluster) {
                    if (nextEvent.startDate.isAfter(clusterDisplay.event.endDate)) {
                        // will be displayed under
                        nextDisplay.s = clusterDisplay.s;
                        nextDisplay.p = lastDisplay.p;
                        nextDisplay.f = lastDisplay.p + 1 - clusterDisplay.s;
                        parallel = false;
                        break;
                    }
                }
                nextDisplay.cluster.push(nextDisplay);
                if (parallel) {
                    // take the next slot
                    nextDisplay.s = lastDisplay.s + 1;
                    // could not fit event under existing one in cluster - adding parallels
                    for (let clusterDisplay of lastDisplay.cluster) {
                        clusterDisplay.p = lastDisplay.cluster.length;
                    }
                }
            }
            lastDate = moment.max(lastDate, nextEvent.endDate);
            stream.push(nextDisplay);
        }
        return stream;
    }
};
CalendarService = tslib_1.__decorate([
    core_1.Injectable()
], CalendarService);
exports.CalendarService = CalendarService;
