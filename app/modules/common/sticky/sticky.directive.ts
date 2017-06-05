import {
	Directive, HostListener, Inject, ViewContainerRef, Input, ContentChild, Renderer,
	AfterContentInit
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Throttle } from '../../../decorators/throttle.decorator';


@Directive({
	selector: '[sticky]'
})
export class StickyDirective {
	@Input('sticky-class-name')
	className: string = 'sticky-applied';

	constructor(public vcRef: ViewContainerRef) {}
}

@Directive({
	selector: '[sticky-root]'
})
export class StickyRootDirective implements AfterContentInit {

	@Input('sticky-class-name')
	className: string = 'sticky-root-applied';

	constructor(
		@Inject(DOCUMENT)
		private document: Document,
		private renderer: Renderer,
		public vcRef: ViewContainerRef) {
	}

	@ContentChild(StickyDirective)
	sticker: StickyDirective;

	@HostListener('window:scroll', [])
	@Throttle()
	handleScroll() {
		let scrollTop = this.document.body.scrollTop;
		let nativeElement = this.vcRef.element.nativeElement as HTMLElement;
		let stickerElement = this.sticker.vcRef.element.nativeElement as HTMLElement;

		if (!stickerElement || !nativeElement) {
			return;
		}

		let isFixed = scrollTop > nativeElement.clientTop;

		this.renderer.setElementClass(stickerElement, this.sticker.className, isFixed);
		this.renderer.setElementClass(nativeElement, this.className, isFixed);
		this.renderer.setElementStyle(nativeElement, 'paddingTop', isFixed ? `${stickerElement.clientHeight}px` : '');
	}

	ngAfterContentInit(): void {
		this.handleScroll();
	}
}
