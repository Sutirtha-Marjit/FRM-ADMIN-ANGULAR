import { Component, OnInit, Input } from '@angular/core';
import {FeaturedBlockDataSet} from '../../../datatypes/Datatypes';

@Component({
  selector: 'app-featured-data-block',
  templateUrl: './featured-data-block.component.html',
  styleUrls: ['./featured-data-block.component.less']
})
export class FeaturedDataBlockComponent implements OnInit {


  @Input() data:FeaturedBlockDataSet = null;
  constructor() { }

  ngOnInit() {
  }

}
