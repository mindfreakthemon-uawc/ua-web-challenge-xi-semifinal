"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const throttle_decorator_1 = require("../../../decorators/throttle.decorator");
let StickyDirective = class StickyDirective {
    constructor(vcRef) {
        this.vcRef = vcRef;
        this.className = 'sticky-applied';
    }
};
tslib_1.__decorate([
    core_1.Input('sticky-class-name'),
    tslib_1.__metadata("design:type", String)
], StickyDirective.prototype, "className", void 0);
StickyDirective = tslib_1.__decorate([
    core_1.Directive({
        selector: '[sticky]'
    }),
    tslib_1.__metadata("design:paramtypes", [core_1.ViewContainerRef])
], StickyDirective);
exports.StickyDirective = StickyDirective;
let StickyRootDirective = class StickyRootDirective {
    constructor(document, renderer, vcRef) {
        this.document = document;
        this.renderer = renderer;
        this.vcRef = vcRef;
        this.className = 'sticky-root-applied';
    }
    handleScroll() {
        let scrollTop = this.document.body.scrollTop;
        let nativeElement = this.vcRef.element.nativeElement;
        let stickerElement = this.sticker.vcRef.element.nativeElement;
        if (!stickerElement || !nativeElement) {
            return;
        }
        let isFixed = scrollTop > nativeElement.clientTop;
        this.renderer.setElementClass(stickerElement, this.sticker.className, isFixed);
        this.renderer.setElementClass(nativeElement, this.className, isFixed);
        this.renderer.setElementStyle(nativeElement, 'paddingTop', isFixed ? `${stickerElement.clientHeight}px` : '');
    }
    ngAfterContentInit() {
        this.handleScroll();
    }
};
tslib_1.__decorate([
    core_1.Input('sticky-class-name'),
    tslib_1.__metadata("design:type", String)
], StickyRootDirective.prototype, "className", void 0);
tslib_1.__decorate([
    core_1.ContentChild(StickyDirective),
    tslib_1.__metadata("design:type", StickyDirective)
], StickyRootDirective.prototype, "sticker", void 0);
tslib_1.__decorate([
    core_1.HostListener('window:scroll', []),
    throttle_decorator_1.Throttle(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], StickyRootDirective.prototype, "handleScroll", null);
StickyRootDirective = tslib_1.__decorate([
    core_1.Directive({
        selector: '[sticky-root]'
    }),
    tslib_1.__param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
    tslib_1.__metadata("design:paramtypes", [Document,
        core_1.Renderer,
        core_1.ViewContainerRef])
], StickyRootDirective);
exports.StickyRootDirective = StickyRootDirective;
