import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-home',
	templateUrl: 'home.component.html'
})
export class HomeComponent {
	body;
	id;
	posts;
	constructor(private _http: HttpClient) {}

	ngOnInit() {
		this._http
			.get<any>('https://ang6-blog.herokuapp.com/posts')
			.subscribe(getReply => {
				this.posts = getReply;
			});
	}

	post() {
		this._http
			.post<any>('https://ang6-blog.herokuapp.com/post', {
				body: this.body
			})
			.subscribe(postReply => {
				console.log(postReply);
			});
	}

	update() {
		this._http
			.put<any>('https://ang6-blog.herokuapp.com/post', {
				body: this.body,
				id: this.id
			})
			.subscribe(postReply => {
				console.log(postReply);
			});
	}

	delete() {
		this._http
			.delete<any>('https://ang6-blog.herokuapp.com/post', this.id)
			.subscribe(postReply => {
				console.log(postReply);
			});
	}
}
