"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const app_module_1 = require("./app.module");
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    })
        .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch((err) => {
        console.log('ServiceWorker registration failed: ', err);
    });
}
