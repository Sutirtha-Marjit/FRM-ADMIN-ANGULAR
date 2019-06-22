import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {AppErrorObject} from '../../../datatypes/Datatypes';


@Component({
  selector: 'app-failure-box',
  templateUrl: './failure-box.component.html',
  styleUrls: ['./failure-box.component.less']
})
export class FailureBoxComponent implements OnInit {

  @Input() className = 'normal';
  @Input() ctaText = '';
  @Input() errorObj:AppErrorObject = {
    heading:'Error occured',
    code:'400',
    description:'An error occured'
  }
  @Output() action = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  callToAction(){
      this.action.emit('action fired!');
  }

}
