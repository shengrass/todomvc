import { DataService } from './data.service';
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
  todos: any[] = [];
  todo: string = '';
  filterType: string = 'all';
  isSelectAll = false;
  editMode = -1;

  constructor(private _dataService: DataService) {
    this._dataService.getTodos().subscribe(res => {
      this.todos = res.json();
      this._dataService.todos = this.todos;
      this.checkToggle(true);
    });
  }

  addTodo() {
    if (this.todo) {
      //方法1 "..."this.todos 是用來展開 array
      this.todos = [...this.todos, { value: this.todo, done: false }];
      //方法2
      //this.todos.push({ value: this.todo, done: false });
      this._dataService.todos = this.todos;
      this._dataService.updateTodos();
    }
    this.todo = '';
  }

  //收到 footerComponent 傳送的 emit() 後才會執行
  clearCompleted($event) {
    console.log("clearCompleted", $event);
    //只留下未完成的代辦事項
    this.todos = $event;
    this._dataService.todos = this.todos;
    this._dataService.updateTodos();
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
    this._dataService.todos = this.todos;
    this._dataService.updateTodos();
  }

  checkToggle(firstTime? : boolean) {
    console.log("isSelectAll", this.isSelectAll);
    //未完成的數量
    const length = this.todos.filter(item => item.done === this.isSelectAll).length;
    console.log("length", length);
    //如果未完成的數量大於0 => 全選的checkbox為false(不打勾)
    //如果未完成的數量等於0 => 全選的checkbox為true(打勾)
    this.isSelectAll = length > 0 ? false : true;
    this._dataService.todos = this.todos;
    if(firstTime) {
    }
    else {
      this._dataService.updateTodos();
    }
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
    this._dataService.todos = this.todos;
    this._dataService.updateTodos();
  }

  saveItem(target: HTMLInputElement, item) {
     const index = this.todos.indexOf(item);
     this.todos[index].value = target.value;
     this._dataService.todos = this.todos;
     this._dataService.updateTodos();
     this.editMode = -1;
   }
}
