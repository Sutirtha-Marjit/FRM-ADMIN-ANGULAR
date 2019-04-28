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
    bigText:'1000',
    smallText:'smallText',
    graphData:{},
    isDark:true
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

  getBigNumber(){
    const t = parseInt(this.config.bigText);
    return t.toLocaleString();
    
    
  }

}
