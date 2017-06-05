"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventModel {
    constructor({ title = 'New Event', description = '' } = {}) {
        this.title = title;
        this.description = description;
    }
    get startDate() {
        return this._startDate;
    }
    set startDate(value) {
        this._startDate = value;
    }
    get endDate() {
        return this._endDate;
    }
    set endDate(value) {
        this._endDate = value;
    }
}
exports.EventModel = EventModel;
