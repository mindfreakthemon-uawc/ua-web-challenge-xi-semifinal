"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const abstract_data_service_1 = require("../../../common/services/abstract-data.service");
const event_model_1 = require("../models/event.model");
const moment = require("moment");
let EventsService = class EventsService extends abstract_data_service_1.AbstractDataService {
    createInstance(data) {
        let startDate = moment(data.startDate || data._startDate || data.date);
        let endDate = data.duration ? startDate.clone().add(data.duration, 'minutes') : moment(data.endDate || data._endDate);
        let event = new event_model_1.EventModel(data);
        startDate
            .seconds(0)
            .milliseconds(0);
        endDate
            .seconds(0)
            .milliseconds(0);
        event.startDate = startDate;
        event.endDate = endDate;
        return event;
    }
    getRangeList(rangeStart, rangeEnd) {
        return this.getList()
            .then((events) => {
            return events.filter((event) => {
                return event.startDate.isBetween(rangeStart, rangeEnd, 'minutes', '[]')
                    || event.endDate.isBetween(rangeStart, rangeEnd, 'minutes', '[]')
                    || event.startDate.isBefore(rangeStart, 'minutes') && event.endDate.isAfter(rangeEnd, 'minutes');
            });
        });
    }
    save() {
        localStorage.setItem('events', JSON.stringify(this.cache));
        return Promise.resolve(this.cache);
    }
    sync() {
        let events = [];
        let json = localStorage.getItem('events');
        try {
            if (json) {
                events = JSON.parse(json);
            }
        }
        catch (e) {
            // empty
        }
        return Promise.resolve(events);
    }
};
EventsService = tslib_1.__decorate([
    core_1.Injectable()
], EventsService);
exports.EventsService = EventsService;
