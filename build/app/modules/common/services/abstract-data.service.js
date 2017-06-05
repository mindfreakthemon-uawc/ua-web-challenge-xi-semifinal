"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class AbstractDataService {
    constructor() {
        this.update = new core_1.EventEmitter();
    }
    getList() {
        if (this.cache) {
            return Promise.resolve(this.cache);
        }
        if (this.promise) {
            return this.promise;
        }
        this.promise = this.sync()
            .then((array) => this.cache = array.map((item) => this.createInstance(item)));
        return this.promise;
    }
    add(entry) {
        this.cache.push(entry);
        this.save()
            .then(() => this.update.next());
    }
    remove(entry) {
        let index = this.cache.indexOf(entry);
        if (index > -1) {
            this.cache.splice(index, 1);
            this.save()
                .then(() => this.update.next());
        }
    }
}
exports.AbstractDataService = AbstractDataService;
