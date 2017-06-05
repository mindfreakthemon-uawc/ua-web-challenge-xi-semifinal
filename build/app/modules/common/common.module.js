"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const loading_component_1 = require("./loading/loading.component");
const router_1 = require("@angular/router");
const sticky_directive_1 = require("./sticky/sticky.directive");
const root_component_1 = require("./root/root.component");
let CommonModule = class CommonModule {
};
CommonModule = tslib_1.__decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            router_1.RouterModule
        ],
        declarations: [
            loading_component_1.LoadingComponent,
            sticky_directive_1.StickyDirective,
            sticky_directive_1.StickyRootDirective,
            root_component_1.RootComponent
        ],
        providers: [],
        exports: [
            loading_component_1.LoadingComponent,
            sticky_directive_1.StickyDirective,
            sticky_directive_1.StickyRootDirective,
            root_component_1.RootComponent
        ]
    })
], CommonModule);
exports.CommonModule = CommonModule;
