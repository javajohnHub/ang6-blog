import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoContentComponent } from './components/no-content/no-content';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{ path: '**', component: NoContentComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})
export class FrontRoutingModule {}
