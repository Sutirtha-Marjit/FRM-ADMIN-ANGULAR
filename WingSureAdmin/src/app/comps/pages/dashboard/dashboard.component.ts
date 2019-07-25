import { Component, OnInit } from '@angular/core';
import { StatCakeConfig, FeaturedBlockDataSet } from '../../../datatypes/Datatypes';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as Highcharts from 'highcharts';
import { } from 'highcharts-angular';
import { RequestURLService } from '../../../facility/request-url.service';
import { AppErrorObject } from '../../../datatypes/Datatypes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {


  private currentTimeSlot=90;
  private statisticsCakeArray: Array<StatCakeConfig> = [];
  public statisticsTimeIntervalOptions: Array<{ name: string, val: number, selected: boolean }> = [];
  public statisticsErrorObject:AppErrorObject = null;
  public statisticsPercentageArray=[];

  public megaChartOptions: any = null;
  public Highcharts = null;
  public chartConstructor = '';

  public trendingData: Array<FeaturedBlockDataSet> = null;
  public mostPopularArticles: Array<FeaturedBlockDataSet> = [];
  public mostPopularImages: Array<FeaturedBlockDataSet> = [];
  public mostPopularVideos: Array<FeaturedBlockDataSet> = [];

  public requestFailCollection = null;

  constructor(private http: HttpClient, private reqURLService: RequestURLService) {
    this.requestFailCollection = {
      mostPopularArticles:null,
      mostPopularImages:null,
      mostPopularVideos:null,
      trendingData:null
    }
  }

  onTImeSlotSelected(e) {
    console.log(e);
    this.currentTimeSlot = e.val;
    this.populateStatisticsCake();
  }

  getStatisticsCake() {
    return this.statisticsCakeArray;
  }

  public populateStatisticsTimeSlot(){
    const p = {variable_name:'no_of_days_option'};
    this.http.get(this.reqURLService.getAPIURLS().statBoxTimeSlotDetails,{params:p}).subscribe((data:any)=>{
      if(data){
        data.forEach((obj)=>{
          this.statisticsTimeIntervalOptions.push({
            name:obj.key,
            selected:obj.isDefault,
            val:obj.value
          });    
        });
      }
      

    },(errorData:HttpErrorResponse)=>{
      this.statisticsErrorObject = {
        heading:`${errorData.statusText}. Timeslot options are failing to load.`,
        code:`${errorData.status}`,
        description:`${errorData.message}`
      };
    });
  }

  private populateStatisticsCake() {

    const urls = [
      `${this.reqURLService.getAPIURLS().statBoxTotal}/${this.currentTimeSlot}`,
      this.reqURLService.getAPIURLS().statBoxViewed,
      this.reqURLService.getAPIURLS().statBoxDownloaded,
      this.reqURLService.getAPIURLS().statBoxLiked
    ]

    const urlsPercentage = [
      '',
      this.reqURLService.getAPIURLS().statBoxViewedPercentage,
      this.reqURLService.getAPIURLS().statBoxDownloadedPercentage,
      this.reqURLService.getAPIURLS().statBoxLikedPercentage
    ];

    this.statisticsCakeArray = [
      {
        bigText: '',
        smallText: 'Total content uploaded',
        bgColor: '#16739a',
        isDark: true,
        inProgress: true,
        errorData: null
      },
      {
        bigText: '',
        smallText: 'Viewed',
        isDark: false,
        inProgress: true,
        errorData: null
      },
      {
        bigText: '',
        smallText: 'Downloaded',
        isDark: false,
        inProgress: true,
        errorData: null
      },
      {
        bigText: '',
        smallText: 'Liked',
        isDark: false,
        inProgress: true,
        errorData: null
      }
    ];

    urls.forEach((url, i) => {
      let p={};
      const $index = i;
      if(i>0){
        p = {no_of_days:this.currentTimeSlot};
      }
      
      this.http.get(url,{params:p}).subscribe((data: any) => {
        this.statisticsCakeArray[$index].inProgress = false;
        this.statisticsCakeArray[$index].bigText = data;
        this.statisticsCakeArray[$index].errorData = null;
      }, (errorData: HttpErrorResponse) => {
        this.statisticsCakeArray[$index].inProgress = false;
        this.statisticsCakeArray[$index].errorData = {
          heading: 'Error',
          code: `${errorData.status}`,
          description: errorData.message
        };
      });

      if(urlsPercentage[i].length>0){
        this.http.get(urlsPercentage[i],{params:p}).subscribe((percentageData:any)=>{
          this.statisticsPercentageArray[$index]={
            percent:parseInt(percentageData,0),
            on:true,
            up:true
          };
        },()=>{

        })
      }

    });



  }

  private populateTrendingData() {
    this.trendingData = [];
    this.http.get(this.reqURLService.getAPIURLS().trending,{}).subscribe((data:any)=>{
      
      data.forEach((el)=>{
        this.trendingData.push({
          id:el.training_article_id,
          pattern:'SHORT_PATTERN_0',
          heading: el.title,
          viewed: el.max_total_viewed,
          liked: el.max_total_liked,
          downloaded: el.max_total_downloaded || 0,
          listened: el.max_total_listened || 0,
          dateOfPublish: el.date_of_publish || new Date(),
          thumbnail: el.thumbnail || el.content_url,
          expandURL:'',
          resourceURL:'',
          mediaType: el.content_type
        });
      });
      console.log('Trending data',this.trendingData);
    },()=>{
      console.log('trending failed');
    });
    

  }

  private populateMostPopularArticles() {
    this.mostPopularArticles=[];
    this.requestFailCollection.mostPopularArticles = null;
    this.http.get(this.reqURLService.getAPIURLS().mpArticles,{}).subscribe((data:any)=>{
        
        data.forEach((el)=>{
          this.mostPopularArticles.push({
            id:el.training_article_id,
            pattern:'SHORT_PATTERN_0',
            heading: el.title,
            viewed:el.max_total_viewed || 0,
            liked:el.max_total_liked || 0,
            downloaded:0,
            listened:0,
            dateOfPublish: new Date(),
            thumbnail: './assets/images/default/pattern-thumbnail.01.jpg',
            expandURL:el.content_url,
            resourceURL:el.content_url,
            mediaType: 'ARTICLE'
          })
        })
    },(error:HttpErrorResponse)=>{
      this.requestFailCollection.mostPopularArticles = {
        heading:error.statusText,
        description:error.message,
        code:error.status
      };
    })
    

  }

  private populateMostPopularImages() {
    this.mostPopularImages = [];
    this.requestFailCollection.mostPopularImages = null;
    this.http.get(this.reqURLService.getAPIURLS().mpImage,{}).subscribe((data:any)=>{
      console.log(data,'populateMostPopularImages');
      data.forEach((el)=>{
        this.mostPopularImages.push({
          id:el.training_article_id,
          pattern: 'SHORT_PATTERN_0',
          heading: el.title,
          viewed:el.max_total_viewed || 0,
          liked:el.max_total_liked || 0,
          downloaded: 0,
          listened: 0,
          dateOfPublish: new Date(),
          thumbnail: el.content_url,
          expandURL: el.content_url,
          resourceURL: el.content_url,
          mediaType: 'IMAGE'
        });

      });
     
    },(error:HttpErrorResponse)=>{
      this.requestFailCollection.mostPopularImages = {
        heading:error.statusText,
        description:error.message,
        code:error.status
      };
    });
    

  }

  private populateMostPopularVideos() {
    this.requestFailCollection.mostPopularVideos = null;
    this.http.get(this.reqURLService.getAPIURLS().mpVideos,{}).subscribe((data:any)=>{
      data.forEach((el)=>{
        this.mostPopularVideos.push({
          id:el.training_article_id,
          pattern: 'LONG_PATTERN_0',
          heading: el.title,
          viewed:el.max_total_viewed || 0,
          liked:el.max_total_liked || 0,
          downloaded: 0,
          listened: 0,
          dateOfPublish: new Date(),
          thumbnail: './assets/images/default/video-thumbnail.png',
          expandURL: el.content_url,
          resourceURL: el.content_url,
          mediaType: 'VIDEO'
        })
      })
    },(error:HttpErrorResponse)=>{
      this.requestFailCollection.mostPopularImages = {
        heading:error.statusText,
        description:error.message,
        code:error.status
      };
    })

    

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
          pointStart: 1,
          pointInterval: 7,
          pointEnd: 365

        }
      },
      xAxis: {
        title: {
          text: 'Time'
        }
      },
      series:
        //[{"name":"Video","data":[31168,271177,143775,163848,64497,151084,96559,37164,288295,282011,170147,215508,255709,295835,176296,171219,200689,84621,44099,295650,23398,262798,45536,67463,257163,86149,272643,5421,101313,221417,231382,56040,297807,144213,295279,120642,2698,82257,130350,18149,254303,137456,78599,111509,156434,66574,127804,155699,152122,136690,136451,122256,181613,177566,230797,184046,112783,145154,150954,85076,203621,60532,37906,31106,52953,26932,6582,169284,155447,24247,27339,223692,294818,89351,232951,255949,299707,123400,222716,48861,81115,106139,182617,217849,130889,204943,187933,58966,265134,289028,40634,214639,127817,175766,18079,131107,57443,84022,161085,114438,101023,200189,178692,26176,57027,20655,237856,254083,46877,132477,281017,279292,97818,198831,82678,212961,141896,151011,105699,3889,178527,282658,12136,118976,23091,213055,140329,100500,179170,273342,258761,86649,205772,136858,79968,62459,193652,274147,203983,6284,195076,82169,93919,181397,181904,57430,30042,299884,135091,21224,191769,27879,218180,11390,43007,60927,82469,83054,19422,229701,199143,201943,269245,83071,143448,60852,289293,242091,93294,232286,86085,51842,244105,154941,279769,148782,187389,140620,174813,259520,83997,237808,85805,75128,177617,247933,133290,252602,39326,134830,62507,135057,290083,18344,212335,100963,284349,127453,24962,159827,19394,223337,298616,12885,134382,222023,180283,36588,151389,87970,113546,193119,233937,76891,104588,285974,287234,93039,21301,1846,56036,40758,149731,192372,68560,141163,138880,65041,84309,42870,255444,105462,253798,225628,195593,162703,220698,216494,271287,198892,55811,231714,60388,254548,85507,139894,154161,202987,15784,241192,204468,111592,255687,81888,228907,103058,295857,257613,69782,139479,104969,200236,226396,249489,289613,158184,170686,267683,273700,247985,249490,4119,139495,277606,1273,27863,54389,206804,18623,62500,48327,239529,87548,52688,122797,203321,97733,136055,179454,298834,225800,257544,244842,214283,174356,199354,256902,178884,106734,194223,208546,138195,71838,243642,237944,171142,24507,11770,35806,259418,37745,114908,103232,74553,244161,123317,253867,257090,16646,107704,268998,180562,82592,100381,15398,157965,253020,44268,223216,64739,203946,118250,257208,223647,246121,228440,254889,6059,190041,35724,36974,200567,152340,274751,210102,254730,74237,212078,196677,223363,50167,166978,216235,93218,149753,252133,75068,104202,130268,289478,18770,128964,11563,120129,180582]},{"name":"Podcast","data":[291573,151637,97570,127452,66525,221290,65122,199820,126611,159507,262529,4503,286782,193925,147237,202961,205631,299082,237925,110855,57171,130939,161805,33663,283150,281622,98024,177409,30437,3708,21435,206780,259819,191570,134971,211630,82385,140574,122765,109687,60029,114703,261802,244652,227722,76193,89708,110586,68822,5982,50450,126673,55883,65884,257976,158714,39159,241666,74821,143352,223709,143760,42155,95354,21693,104401,122275,84735,132228,214066,259137,180984,284012,56388,117480,281308,20756,198833,4304,158067,158130,61786,165526,261109,9568,44605,18490,59296,112769,43668,213236,20191,6627,242226,249338,254139,26702,274341,160177,60178,19474,167537,139643,44391,230401,225759,241602,30546,33371,26409,290208,196307,194747,282801,195049,119926,193710,13440,233390,178572,6329,105427,40519,60942,126379,121430,52694,252126,106782,82495,71036,170997,90697,54243,219903,32986,200756,10278,166222,15058,110438,262884,140320,76720,135405,264185,49764,100099,249375,271709,66793,290968,19987,201429,71590,28358,236776,113938,211094,29762,142074,244263,31364,149505,144659,298564,147102,255935,141087,8625,204989,131557,51976,81531,243809,127939,80211,186028,138803,121915,124277,1837,282081,51012,273843,90797,26378,193977,47386,203950,46771,295018,12540,136482,248995,127291,298046,19050,127965,213831,57619,103790,125169,201763,32016,103281,40998,22478,245056,1964,155127,150220,151907,107555,162077,270628,255756,46478,51564,2640,262414,68549,264172,275331,228590,28308,154464,18247,75677,45814,230196,182669,114145,66445,167985,20450,146567,154810,275194,29594,273033,118812,278200,267387,80784,118709,132240,51762,23578,279734,252114,266182,23387,36408,39319,63679,282982,212696,145256,78514,37278,234841,207141,294742,252984,61029,163241,168634,183932,101236,150722,14157,174487,255187,117435,88729,57161,40274,36483,174912,183566,155383,110324,48189,176411,147873,247605,275152,106450,42323,84825,270206,182773,255959,163617,38381,116886,179948,168879,8741,15610,251819,111988,279153,4009,206026,104634,120075,89311,200808,37825,144504,261395,143447,59722,51101,39471,130884,246014,15510,252543,145041,182620,296842,168458,56852,104897,298203,124324,247352,296870,212473,288458,123696,35038,291086,248548,287869,252777,160470,238695,120597,229738,208215,130361,167676,83996,178278,204691,231407,172292,20800,135775,122992,38618,162353,298464,159936,25954,250104,162228,70680,202115,88547,166264]},{"name":"Image","data":[253281,194416,64475,172629,1995,262056,14466,280454,16762,121055,240637,127012,200615,117899,240648,84704,167653,149073,140084,16802,4878,248843,7098,65083,54023,282927,235680,117730,224918,115792,108380,175087,270246,28804,103938,68526,154951,271154,2601,221733,286714,63068,252914,294094,95792,105211,275607,28194,188273,134538,24142,108506,96178,179110,174115,223192,61869,186684,249932,257436,3677,277153,134155,45632,23813,53893,1874,247026,187561,185796,82008,82903,144430,272621,127929,187169,22155,208701,18517,202873,12794,199944,258065,152239,235865,202544,265809,42228,255652,48031,282870,99912,59995,134273,296642,157416,127056,3889,20527,158099,141723,57751,248730,120104,196556,210635,183800,142727,179758,242536,294620,197554,159479,224411,286447,78170,28144,298477,291669,180641,298424,93432,173325,191371,10005,257682,251966,64921,13138,29107,178736,188088,100293,76500,160240,64137,165379,239998,66827,248160,153887,91215,122106,90828,103324,200842,15036,271043,209425,782,64016,104436,259539,202682,19672,127347,58035,192889,286740,11060,271196,249743,284139,198757,42579,105606,192191,64042,225067,6293,206063,60892,54049,265154,150381,124083,276161,196400,252364,277925,15896,165642,70108,133426,154517,135041,95634,219254,262807,266063,242914,275936,65354,221688,24157,166568,214055,9686,160008,202446,70931,80149,87660,143667,218313,196485,87152,16349,127205,212155,77400,221105,85295,99090,293096,108827,127376,28937,31881,248335,203667,228212,36408,184180,186290,71424,17635,178372,104200,75606,279821,32189,112286,29272,194653,151256,91859,247521,27336,173545,264240,160632,234035,236226,65068,195210,72799,148280,202164,112224,295445,138464,201270,220423,186976,204704,290488,149933,140258,192360,223816,54828,155755,243911,191843,269988,101375,217483,44079,217165,30480,107071,282074,238193,261343,298221,217030,144883,92225,237798,30085,277820,46060,153526,174350,1218,107878,61147,65348,109753,289811,34941,166406,205450,227250,110276,227708,287771,157698,242743,204357,233359,121210,119612,69680,292988,215281,142807,125446,246395,179570,91925,102518,257083,242911,135252,227643,185783,64762,151310,29449,7264,231686,247917,132792,250386,180946,172806,273543,250282,9572,1010,174856,145234,157119,103986,98120,40332,168530,48721,205638,274495,137035,217791,9758,16431,202583,211566,91294,156684,167460,205514,289182,102710,1678,270828,253053,296345,209177,287792,135735,186407,11128,39770,104804]},{"name":"Article","data":[130058,299366,244953,197528,46891,187550,253350,44088,201628,112523,256407,297770,258638,229711,168565,257266,149296,278802,74532,58641,25932,49928,128397,206653,105809,29690,20282,169645,222783,162626,190715,13995,71353,242750,126210,234030,130329,64784,124377,80869,218742,105192,249125,163352,33621,217650,216546,181351,25853,42393,214161,241709,222040,34648,117166,114377,90724,107956,120458,269189,55412,87822,141464,241982,197026,271719,196605,141247,148118,155030,180737,205264,220080,115002,107047,122238,88235,71580,139371,98500,275158,236782,151359,278841,181938,216002,81737,295441,298182,84318,266668,81707,58249,282773,167155,138316,157814,238198,222904,181544,30946,119741,22146,261987,206066,16961,256487,235324,103189,229080,293979,234900,160671,18904,76233,213603,265724,263757,142384,13298,295376,225467,231676,197057,102742,104990,143157,294455,230553,227986,281950,275744,494,18574,30181,6702,104332,100776,26892,254301,220348,299654,108742,288606,129652,282377,143813,157165,135235,83139,88880,81876,66476,6366,294690,49874,77860,213922,152585,27201,264766,70979,139174,279777,48988,283456,75840,239943,106982,245053,193758,283135,112275,13265,44458,174707,240998,103067,62685,46507,188485,81006,245462,257449,194375,80047,290219,201798,61800,106790,264920,193800,55243,111406,286494,25292,221583,140604,162380,274172,255364,87971,289857,166141,61885,163355,130998,44549,257179,102565,109366,296143,26916,280323,251414,251008,184998,271222,7067,5133,134384,151495,23323,101997,243420,163930,251870,169680,266611,214564,51882,251355,227884,76543,93121,170679,86901,180100,80422,104985,263895,116301,256995,104414,47930,175569,177374,86756,37664,61859,256635,290185,86412,289403,248104,6793,13672,191977,159229,48492,205768,72227,298803,48650,150031,267535,204135,70828,15960,128989,280273,111898,205291,83895,143701,180343,221130,264069,265421,288157,61893,70317,168537,191337,60815,295924,55998,156838,167477,262911,187449,115569,186286,109605,259141,6481,190134,72883,178935,201863,44420,159920,231902,298611,227520,62336,248349,125068,213333,153143,230156,239574,241639,86422,289451,132591,164338,19907,27950,9421,153284,270647,235311,257625,272245,139158,169326,42389,136321,277043,83185,12720,271370,118337,15966,156190,137643,43398,21523,139063,112288,140157,15849,193189,161465,148162,102983,208518,233325,96871,141173,295929,155466,66788,242307,81461,86647,214617,179629,69090,103654,14738,103126,182860,282351]}]

        [{
          name: 'Video',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175, 137133, 154175]
        }, {
          name: 'Podcast',
          data: [24916, 43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175, 24064, 85742, 29851, 32490, 90282, 38121, 40434]
        }, {
          name: 'Image',
          data: [11744, 17722, 16005, 43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175, 19771, 20185, 24377, 32147, 39387]
        },
        {
          name: 'Article',
          data: [10044, 17722, 16005, 899, 43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175, 20185, 24377, 32147, 39387]
        }
        ]


    };
    this.populateStatisticsCake();


    this.populateTrendingData();
    this.populateMostPopularImages();
    this.populateMostPopularArticles();
    this.populateMostPopularVideos();
    this.populateStatisticsTimeSlot();
  }

}
