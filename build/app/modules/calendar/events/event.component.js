"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const event_model_1 = require("./models/event.model");
let EventComponent = class EventComponent {
};
tslib_1.__decorate([
    core_1.Input(),
    tslib_1.__metadata("design:type", event_model_1.EventModel)
], EventComponent.prototype, "event", void 0);
EventComponent = tslib_1.__decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'event',
        templateUrl: 'tmpl/event.html',
        styleUrls: ['styles/event.css']
    })
], EventComponent);
exports.EventComponent = EventComponent;
