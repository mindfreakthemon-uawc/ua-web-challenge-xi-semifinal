"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function throttle(fn, threshhold = 100, scope) {
    let last = 0;
    let deferTimer;
    return function () {
        let context = scope || this;
        let now = +new Date;
        let args = arguments;
        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = window.setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        }
        else {
            last = now;
            fn.apply(context, args);
        }
    };
}
function Throttle(threshhold) {
    return function (target, propertyKey, descriptor) {
        descriptor.value = throttle(descriptor.value, threshhold);
    };
}
exports.Throttle = Throttle;
