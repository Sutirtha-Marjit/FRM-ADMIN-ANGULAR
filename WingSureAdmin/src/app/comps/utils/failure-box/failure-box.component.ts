import { Component, OnInit,Input,Output } from '@angular/core';
import {AppErrorObject} from '../../../datatypes/Datatypes';

@Component({
  selector: 'app-failure-box',
  templateUrl: './failure-box.component.html',
  styleUrls: ['./failure-box.component.less']
})
export class FailureBoxComponent implements OnInit {

  @Input() errorObj:AppErrorObject = {
    heading:'Error occured',
    code:'400',
    description:'An error occured'
  }

  constructor() { }

  ngOnInit() {
  }

}
