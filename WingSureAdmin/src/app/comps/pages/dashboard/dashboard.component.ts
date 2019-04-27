import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  private statisticsCakeArray = [{},{},{},{}];
  constructor() { }

  getStatisticsCake(){
    return this.statisticsCakeArray;
  }

  ngOnInit() {
  }

}
