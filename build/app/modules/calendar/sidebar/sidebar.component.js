"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const event_model_1 = require("../events/models/event.model");
const moment = require("moment");
const events_service_1 = require("../events/services/events.service");
const ics_js_1 = require("ics-js");
let SidebarComponent = class SidebarComponent {
    constructor(eventsService) {
        this.eventsService = eventsService;
        this.remove = new core_1.EventEmitter();
    }
    setStartDate(value) {
        if (!value) {
            return;
        }
        this.event.startDate = moment(value, 'YYYY-MM-DDTHH:mm');
        this.eventsService.update.next();
    }
    setEndDate(value) {
        if (!value) {
            return;
        }
        this.event.endDate = moment(value, 'YYYY-MM-DDTHH:mm');
        this.eventsService.update.next();
    }
    downloadICS() {
        const calendar = new ics_js_1.VCALENDAR();
        calendar.addProp('VERSION', 2);
        calendar.addProp('PRODID', 'XYZ Corp');
        const event = new ics_js_1.VEVENT();
        event.addProp('UID');
        event.addProp('DTEND', this.event.endDate.toDate(), { VALUE: 'DATE-TIME' });
        event.addProp('DTSTART', this.event.startDate.toDate(), { VALUE: 'DATE-TIME' });
        event.addProp('DTSTAMP', moment().toDate(), { VALUE: 'DATE-TIME' });
        event.addProp('SUMMARY', this.event.title);
        calendar.addComponent(event);
        this.download('event.ics', calendar.toBlob());
    }
    download(filename, blob) {
        const element = document.createElement('a');
        const url = URL.createObjectURL(blob);
        element.setAttribute('href', url);
        element.download = filename;
        element.click();
    }
};
tslib_1.__decorate([
    core_1.Input(),
    tslib_1.__metadata("design:type", event_model_1.EventModel)
], SidebarComponent.prototype, "event", void 0);
tslib_1.__decorate([
    core_1.Output(),
    tslib_1.__metadata("design:type", core_1.EventEmitter)
], SidebarComponent.prototype, "remove", void 0);
SidebarComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'sidebar',
        templateUrl: 'tmpl/sidebar.html',
        styleUrls: ['styles/sidebar.css']
    }),
    tslib_1.__metadata("design:paramtypes", [events_service_1.EventsService])
], SidebarComponent);
exports.SidebarComponent = SidebarComponent;
