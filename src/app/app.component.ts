import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    inputHint = 'What needs to be done?';
    col = 2;
    todos : any[] = [];
    todo:string='';
    addTodo(){
      if(this.todo){
        //方法1 "..."this.todos 是用來展開 array
        this.todos = [...this.todos, { value: this.todo, done: false }];
        //方法2 this.todos.push({ value: this.todo, done: false });
      }
      this.todo = '';
    }
}
