import { Http } from '@angular/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputHint = 'What needs to be done?';
  col = 2;
  todos: any[] = [];
  todo: string = '';
  filterType: string = 'all';
  isSelectAll = false;

  constructor(private http: Http) {

  }
  addTodo() {
    if (this.todo) {
      //方法1 "..."this.todos 是用來展開 array
      this.todos = [...this.todos, { value: this.todo, done: false }];
      //方法2 this.todos.push({ value: this.todo, done: false });
    }
    this.todo = '';
  }

  //收到 footerComponent 傳送的 emit() 後才會執行
  clearCompleted($event) {
    console.log("clearCompleted", $event);
    //只留下未完成的代辦事項
    this.todos = $event;
  }

  switchType(ft: string) {
    this.filterType = ft;
  }

  toggleAll() {
    if (this.isSelectAll) {
      this.todos.forEach(item => {
        item.done = true;
      });
    }
    else {
      this.todos.forEach(item => {
        item.done = false;
      });
    }
  }
  checkToggle() {
    console.log("checkToggle");
    const length = this.todos.filter(item => item.done === this.isSelectAll).length;
    this.isSelectAll = length > 0 ? false : true;
  }

  removeItem(item) {
    const index = this.todos.indexOf(item);
    //從Array移除元素
    this.todos.splice(index, 1);
    this.todos = [...this.todos];
  }
}
