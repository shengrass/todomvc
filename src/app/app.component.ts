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
}
