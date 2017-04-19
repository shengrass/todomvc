import { Headers, Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  private _todos: any[] = [];
  set todos(value) {
      this._todos = value;
  };
  get todos() {
    return this._todos;
  };
  requestOptions: RequestOptions = new RequestOptions({
    headers: new Headers(
      { 'authorization': 'token 825542c2-9848-4a97-8970-1a093e5cb808' })
  });
  constructor(private _http: Http) { }
  getTodos() {
    return this._http.get('./me/todomvc', this.requestOptions);
  }
  updateTodos() {
    this._http.post('./me/todomvc', this.todos, this.requestOptions)
    .subscribe(res => { console.log('更新完成!', res) });
  }
}
