import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
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
  tooMany = false;
  constructor() { }
  ngOnInit() {
    console.log(this.footerTodos);
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
