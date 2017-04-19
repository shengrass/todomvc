import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  //接收父元件的todos
  @Input() footerTodos : any[];
  constructor() { }

  ngOnInit() {
    console.log(this.footerTodos);
  }

}
