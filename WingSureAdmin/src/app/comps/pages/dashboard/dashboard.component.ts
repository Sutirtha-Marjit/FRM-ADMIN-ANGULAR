import { Component, OnInit } from '@angular/core';
import {StatCakeConfig} from '../../../datatypes/Datatypes';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import * as Highcharts from 'highcharts';
import {} from 'highcharts-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  private statisticsCakeArray:Array<StatCakeConfig> = [];
  
  public megaChartOptions:any = null; 
  public Highcharts = null;
  public chartConstructor = '';
  constructor(private http:HttpClient) { }

  getStatisticsCake(){
    return this.statisticsCakeArray;
  }

  ngOnInit() {

    this.http.get(environment.API_ROOT+'/all/count').subscribe((data)=>{
      console.log(data);
    },(error)=>{

    });

    const chartWidth = document.querySelector('.chart-container').clientWidth;
    this.Highcharts = Highcharts;
    this.chartConstructor = 'chart';
    this.megaChartOptions = {
      title:{text:'Avarage view'},
      subtitle:{text:'A data snap shot'},
      chart:{
        width:Math.ceil(chartWidth*(98/100))
      },
      yAxis:{
        title:{
          text:'Duration in hrs'
        }
      },
      legend:{
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
      },
      xAxis:{
        title:{
          text:'Time'
        }
      },
      series: [{
            name: 'Installation',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }, {
            name: 'Manufacturing',
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }, {
            name: 'Sales & Distribution',
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
        }, 
      ]


    };
    this.statisticsCakeArray = [
      {
        bigText:'78451',
        smallText:'Total content uploaded',
        bgColor:'#16739a',
        isDark:true
      },
      {
        bigText:'1000',
        smallText:'Viewed',
        isDark:false
      },
      {
        bigText:'78451',
        smallText:'Downloaded',
        isDark:false
      },
      {
        bigText:'78451',
        smallText:'Liked',
        isDark:false
      }
    ]
  }

}
