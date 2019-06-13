import { Component, OnInit } from '@angular/core';
import { StatCakeConfig, FeaturedBlockDataSet } from '../../../datatypes/Datatypes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as Highcharts from 'highcharts';
import { } from 'highcharts-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {


  private statisticsCakeArray: Array<StatCakeConfig> = [];
  public statisticsTimeIntervalOptions: Array<{ name: string, val: number, selected: boolean }> = [];

  public megaChartOptions: any = null;
  public Highcharts = null;
  public chartConstructor = '';

  public trendingData: Array<FeaturedBlockDataSet> = [];
  public mostPopularArticles: Array<FeaturedBlockDataSet> = [];
  public mostPopularImages: Array<FeaturedBlockDataSet> = [];
  public mostPopularVideos: Array<FeaturedBlockDataSet> = [];

  constructor(private http: HttpClient) {

    this.statisticsTimeIntervalOptions = [
      { name: '3 days', val: 3, selected: false },
      { name: '3 months', val: 3 * 30, selected: true },
      { name: '6 months', val: 6 * 30, selected: false },
      { name: '12 months', val: 365, selected: false },
      { name: '2 years', val: 365 * 2, selected: false },
    ];

  }

  onTImeSlotSelected(e) {
    alert(e.val);
  }

  getStatisticsCake() {
    return this.statisticsCakeArray;
  }

  private populateTrendingData() {
    for (let i = 0; i < 4; i++) {
      this.trendingData[i] = {
        id: `${new Date().getTime()}`,
        pattern: 'SHORT_PATTERN_0',
        heading: 'Some heading text',
        viewed: 10000,
        liked: 1000,
        downloaded: 500,
        listened: 500,
        dateOfPublish: new Date(),
        thumbnail: './assets/images/default/pattern-thumbnail.01.jpg',
        expandURL: '',
        resourceURL: '',
        mediaTYpe:'VIDEO'
      };
    }

  }

  private populateMostPopularArticles() {
    for (let i = 0; i < 8; i++) {
      this.mostPopularArticles[i] = {
        id: `${new Date().getTime()}`,
        pattern: 'SHORT_PATTERN_0',
        heading: 'Some heading text',
        viewed: 10000,
        liked: 1000,
        downloaded: 500,
        listened: 500,
        dateOfPublish: new Date(),
        thumbnail: './assets/images/default/pattern-thumbnail.01.jpg',
        expandURL: '',
        resourceURL: '',
        mediaTYpe:'ARTICLE'
      };
    }

  }

  private populateMostPopularImages() {
    for (let i = 0; i < 4; i++) {
      this.mostPopularImages[i] = {
        id: `${new Date().getTime()}`,
        pattern: 'SHORT_PATTERN_0',
        heading: 'Some heading text',
        viewed: 10000,
        liked: 1000,
        downloaded: 500,
        listened: 500,
        dateOfPublish: new Date(),
        thumbnail: './assets/images/default/pattern-thumbnail.01.jpg',
        expandURL: '',
        resourceURL: '',
        mediaTYpe:'IMAGE'
      };
    }

  }

  private populateMostPopularVideos() {
    for (let i = 0; i < 4; i++) {
      this.mostPopularVideos[i] = {
        id: `${new Date().getTime()}`,
        pattern: 'LONG_PATTERN_0',
        heading: 'Some heading text',
        viewed: 10000,
        liked: 1000,
        downloaded: 500,
        listened: 500,
        dateOfPublish: new Date(),
        thumbnail: './assets/images/default/pattern-thumbnail.01.jpg',
        expandURL: '',
        resourceURL: '',
        mediaTYpe:'VIDEO'
      };
    }

  }

  private loadStatisticsCakes() {

    this.http.get('/api/articles/all').subscribe((data) => {
      console.log(data);
    }, (error) => {

    });

    this.http.get('/api/articles/all/count').subscribe((data) => {
      console.log(data);
    }, (error) => {

    });


    this.http.get('/api/articles/trending?no_of_days=90').subscribe((data) => {
      console.log(data);
    }, (error) => {

    });
  }

  ngOnInit() {

    this.loadStatisticsCakes();
    const chartWidth = document.querySelector('.chart-container').clientWidth;
    this.Highcharts = Highcharts;
    this.chartConstructor = 'chart';
    this.megaChartOptions = {
      title: { text: 'Avarage view' },
      subtitle: { text: 'A data snap shot' },
      chart: {
        width: Math.ceil(chartWidth * (98 / 100))
      },
      yAxis: {
        title: {
          text: 'Duration in hrs'
        }
      },
      legend: {
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
      xAxis: {
        title: {
          text: 'Time'
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
        bigText: '78451',
        smallText: 'Total content uploaded',
        bgColor: '#16739a',
        isDark: true,
        inProgress: true
      },
      {
        bigText: '1000',
        smallText: 'Viewed',
        isDark: false,
        inProgress: true
      },
      {
        bigText: '78451',
        smallText: 'Downloaded',
        isDark: false,
        inProgress: true
      },
      {
        bigText: '78451',
        smallText: 'Liked',
        isDark: false,
        inProgress: true
      }
    ]
    this.populateTrendingData();
    this.populateMostPopularImages();
    this.populateMostPopularArticles();
    this.populateMostPopularVideos();
  }

}
