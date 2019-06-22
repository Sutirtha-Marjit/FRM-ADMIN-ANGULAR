import { Component, OnInit , Input} from '@angular/core';
import {StatCakeConfig} from '../../../datatypes/Datatypes';

@Component({
  selector: 'app-statistics-cake',
  templateUrl: './statistics-cake.component.html',
  styleUrls: ['./statistics-cake.component.less']
})
export class StatisticsCakeComponent implements OnInit {

  

  @Input() config:StatCakeConfig = {
    bgColor:'#ffffff',
    bigText:'',
    smallText:'',
    graphData:{},
    isDark:true,
    inProgress:true,
    errorData:null
  }
  constructor() { }

  ngOnInit() {
  }

  getDarkClass(){
    let className='';
    if(this.config.isDark){
      className = 'dark-theme';
    }
    return className;
  }

  getPreloaderClass(){
    if(this.config.isDark){
      return 'preloader-light';
    }
    return 'preloader-dark';
  }

  getBigNumber(){
    const t = parseInt(this.config.bigText);
    return t.toLocaleString();
    
    
  }

}
