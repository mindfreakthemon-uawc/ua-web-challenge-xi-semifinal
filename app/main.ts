import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);


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