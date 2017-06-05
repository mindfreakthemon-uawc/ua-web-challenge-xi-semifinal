function throttle(fn: any, threshhold: number = 100, scope?: any) {

	let last: number = 0;
	let deferTimer: number;

	return function (this: any) {
		let context = scope || this;
		let now = +new Date;
		let args = arguments;

		if (last && now < last + threshhold) {
			clearTimeout(deferTimer);
			deferTimer = window.setTimeout(function () {
				last = now;
				fn.apply(context, args);
			}, threshhold);
		} else {
			last = now;
			fn.apply(context, args);
		}
	};
}

export function Throttle(threshhold?: number) {
	return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
		descriptor.value = throttle(descriptor.value, threshhold);
	}
}
