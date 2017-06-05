import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

const routes: Routes = [
    // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [
        RouterModule
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
    ]
})
export class AppRoutingModule {
}
