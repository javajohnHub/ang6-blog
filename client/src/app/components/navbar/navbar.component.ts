import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';

@Component({
	moduleId: module.id,
	selector: 'app-navbar',
	templateUrl: 'navbar.component.html'
})
export class NavbarComponent {
	items: MenuItem[];
	@ViewChild('el')
	el: PanelMenu;
	constructor() {}
	ngOnInit() {
		this.items = [
			{
				label: 'Node-Bowshock',
				title: '',
				items: [
					{
						label: 'Home',
						routerLink: ['/'],
						routerLinkActiveOptions: { exact: true },
						command: (event: any) => {
							this.el.model[0].expanded = false;
						}
					}
				]
			}
		];
	}
}
