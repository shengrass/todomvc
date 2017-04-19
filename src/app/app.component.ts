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

    addTodo($event : HTMLInputElement){
      if($event.value){
        this.todos.push({
          value: this.todo,
          done: false });
      }
      this.todo = '';
    }
}
