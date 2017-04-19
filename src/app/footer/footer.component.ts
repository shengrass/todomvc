import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  switchT: string;
  @Output() clearCompleted = new EventEmitter();
  @Output() switchFilterType = new EventEmitter();
  tooMany = false;
  private _todos: any[];
  //接收父元件的todos
  @Input()
  set footerTodos(value) {
    this._todos = value;
    //方法1
    // if (this.footerTodos.length > 5) {
    //   this.tooMany = true;
    // }
    // else {
    //   this.tooMany = false
    // }
    //方法2
    this.tooMany = this.footerTodos.length > 5 ? true : false;
  }
  get footerTodos() {
    return this._todos;
  }
  constructor() { }
  ngOnInit() {
    console.log(this.footerTodos);
  }

  clearCompletedfromFooter() {
    console.log('clicked clear completed');
    //只留下未完成的代辦事項
    this.footerTodos = this.footerTodos.filter(item => item.done === false);
    //傳送一個訊號給上層的Component
    this.clearCompleted.emit(this.footerTodos);
  }

  switchType(value) {
    this.switchT = value;
    this.switchFilterType.emit(value)
  }

  // ngOnChanges() {
  //   if (this.footerTodos.length > 5) {
  //     this.tooMany = true;
  //   }
  //   else {
  //     this.tooMany = false
  //   }
  // }
}
