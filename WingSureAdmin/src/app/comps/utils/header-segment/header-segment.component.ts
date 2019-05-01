import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-segment',
  templateUrl: './header-segment.component.html',
  styleUrls: ['./header-segment.component.less']
})
export class HeaderSegmentComponent implements OnInit {

  @Output() uploadClick = new EventEmitter<MouseEvent>();
  constructor() { }

  ngOnInit() {
  }

  uploadAction($event){
    this.uploadClick.emit($event);
  }

}
