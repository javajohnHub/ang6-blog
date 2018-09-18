import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-home',
	templateUrl: 'home.component.html'
})
export class HomeComponent {
	body;
	constructor(private _http: HttpClient) {}

	ngOnInit() {}

	post() {
		this._http
			.post<any>('https://ang6-blog.herokuapp.com/addpost', {
				body: this.body
			})
			.subscribe(postReply => {
				console.log(postReply);
			});
	}
}
