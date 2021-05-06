import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input('page-title') pageTitle: string;
  @Input('show-button') showButton = true;
  @Input('button-class') buttonClass: string;
  @Input('button-text') buttonText: string;
  @Input('button-link') buttonLink: string;

  @Output() buttonClick = new EventEmitter();
  @Output() isButtonClick = false;

  constructor() {
  }

  ngOnInit(): void {
    this.isButtonClick = !this.buttonLink;
  }

  buttonClickFn(): void {
    this.buttonClick.emit();
  }

}
