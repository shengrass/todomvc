import { Http, RequestOptions, Headers } from '@angular/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputHint = 'What needs to be done?';
  col = 2;
  todos: any[] = []
  // private _todos;
  // set todos(value) {
  //   this._todos = value;
  //   this.updateTodos();
  // };
  // get todos() {
  //   this.updateTodos();
  //   return this._todos;
  // }
  todo: string = '';
  filterType: string = 'all';
  isSelectAll = false;
  requestOptions: RequestOptions = new RequestOptions({
    headers: new Headers({
      'authorization': 'token 825542c2-9848-4a97-8970-1a093e5cb808'
    })
  });

  constructor(private _http: Http) {
    this._http.get('./me/todomvc', this.requestOptions)
      .subscribe(
      res => {
        console.log('下載完成!', res);
        this.todos = res.json();
        const length = this.todos.filter(item => item.done === this.isSelectAll).length;
        this.isSelectAll = length > 0 ? false : true;
      });
  }

  updateTodos() {
    this._http.post('./me/todomvc', this.todos, this.requestOptions)
      .subscribe(
      res => {
        console.log('更新完成!', res)
      });
  }

  addTodo() {
    if (this.todo) {
      //方法1 "..."this.todos 是用來展開 array
      this.todos = [...this.todos, { value: this.todo, done: false }];
      //方法2
      //this.todos.push({ value: this.todo, done: false });
      this.updateTodos();
    }
    this.todo = '';
  }

  //收到 footerComponent 傳送的 emit() 後才會執行
  clearCompleted($event) {
    console.log("clearCompleted", $event);
    //只留下未完成的代辦事項
    this.todos = $event;
    this.updateTodos();
  }

  switchType(ft: string) {
    this.filterType = ft;
  }

  toggleAll() {
    console.log("isSelectAll", this.isSelectAll);
    if (this.isSelectAll) {
      //把代辦事項的done都設為true
      this.todos.forEach(item => {
        item.done = true;
      });
    }
    else {
      //把代辦事項的done都設為false
      this.todos.forEach(item => {
        item.done = false;
      });
    }
    this.updateTodos();
  }

  checkToggle() {
    console.log("isSelectAll", this.isSelectAll);
    //未完成的數量
    const length = this.todos.filter(item => item.done === this.isSelectAll).length;
    console.log("length", length);
    //如果未完成的數量大於0 => 全選的checkbox為false(不打勾)
    //如果未完成的數量等於0 => 全選的checkbox為true(打勾)
    this.isSelectAll = length > 0 ? false : true;
    this.updateTodos();
  }

  removeItem(item) {
    //方法1
    //找出item的index
    const index = this.todos.indexOf(item);
    //從Array移除元素
    this.todos.splice(index, 1);
    //展開todos
    this.todos = [...this.todos];

    //方法2
    //this.todos = this.todos.filter(x => x != item);
    this.updateTodos();
  }
}
