import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnChanges {
  //接收父元件的todos
  @Input() footerTodos: any[];
  tooMany = false;
  constructor() { }
  ngOnInit() {
    console.log(this.footerTodos);
  }

  ngOnChanges() {
    if (this.footerTodos.length > 5) {
      this.tooMany = true;
    }
    else {
      this.tooMany = false
    }
  }
}
