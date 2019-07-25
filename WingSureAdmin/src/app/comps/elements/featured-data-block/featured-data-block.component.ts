import { Component, OnInit, Input } from '@angular/core';
import {FeaturedBlockDataSet} from '../../../datatypes/Datatypes';

@Component({
  selector: 'app-featured-data-block',
  templateUrl: './featured-data-block.component.html',
  styleUrls: ['./featured-data-block.component.less']
})
export class FeaturedDataBlockComponent implements OnInit {


  @Input() data:FeaturedBlockDataSet = {
    id:`${new Date().getTime()}`,
    pattern:'LONG_PATTERN_0',
    heading:'Some heading text',
    viewed:10000,
    liked:1000,
    downloaded:500,
    listened:500,
    dateOfPublish:new Date(),
    thumbnail:'./assets/images/default/pattern-thumbnail.01.jpg',
    expandURL:'',
    resourceURL:'',
    mediaType:'VIDEO'
  };
  
  definedPatterns = {
    l0:'LONG_PATTERN_0',
    s0:'SHORT_PATTERN_0'
  };
    
  
  
  constructor() { }

  ngOnInit() {
  }

  getThumbnail(){
    return `url("${this.data.thumbnail}")`;
  }

}
