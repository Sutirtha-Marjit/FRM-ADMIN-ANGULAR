import { Component, OnInit } from '@angular/core';
import {StatCakeConfig} from '../../../datatypes/Datatypes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  private statisticsCakeArray:Array<StatCakeConfig> = [];
  constructor() { }

  getStatisticsCake(){
    return this.statisticsCakeArray;
  }

  ngOnInit() {
    this.statisticsCakeArray = [
      {
        bigText:'78451',
        smallText:'Total content uploaded',
        bgColor:'#16739a',
        isDark:true
      },
      {
        bigText:'1000',
        smallText:'Total content uploaded',
        isDark:false
      },
      {
        bigText:'78451',
        smallText:'Total content uploaded',
        bgColor:'#16739a',
        isDark:true
      },
      {
        bigText:'78451',
        smallText:'Total content uploaded',
        bgColor:'#16739a',
        isDark:true
      }
    ]
  }

}
