"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const calendar_route_component_1 = require("./calendar/calendar-route.component");
const root_component_1 = require("../common/root/root.component");
const routes = [
    {
        path: '',
        component: root_component_1.RootComponent,
        children: [
            {
                path: '',
                component: calendar_route_component_1.CalendarRouteComponent
            }
        ]
    }
];
let CalendarRoutingModule = class CalendarRoutingModule {
};
CalendarRoutingModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(routes)
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], CalendarRoutingModule);
exports.CalendarRoutingModule = CalendarRoutingModule;
