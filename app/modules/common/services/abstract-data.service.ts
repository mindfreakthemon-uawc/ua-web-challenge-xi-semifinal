import { EventEmitter } from '@angular/core';

export abstract class AbstractDataService<T, P> {

	public readonly update: EventEmitter<any> = new EventEmitter();

	protected cache: T[];

	protected promise: Promise<T[]>;

	getList(): Promise<T[]> {
		if (this.cache) {
			return Promise.resolve(this.cache);
		}

		if (this.promise) {
			return this.promise;
		}

		this.promise = this.sync()
			.then((array) => this.cache = array.map((item: any) => this.createInstance(item)));

		return this.promise;
	}

	add(entry: T): void {
		this.cache.push(entry);

		this.save()
			.then(() => this.update.next());
	}

	remove(entry: T): void {
		let index = this.cache.indexOf(entry);

		if (index > -1) {
			this.cache.splice(index, 1);

			this.save()
				.then(() => this.update.next());
		}
	}

	abstract createInstance(data: P): T;

	abstract sync(): Promise<P[]>;

	abstract save(): Promise<T[]>;
}
