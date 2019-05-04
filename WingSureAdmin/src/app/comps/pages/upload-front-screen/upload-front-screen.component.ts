import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-upload-front-screen',
  templateUrl: './upload-front-screen.component.html',
  styleUrls: ['./upload-front-screen.component.less']
})
export class UploadFrontScreenComponent implements OnInit {

  optionSelected = false;
  optionSelectedIndex=null;
  options = [];


  @Output() goAhedClick = new EventEmitter<any>();
  constructor(private router:Router) { }


  ngOnInit() {
  this.options = [
    {
      title:'IMAGE',
      icon:'photo',
      selected:false
    },
    {
      title:'VIDEO',
      icon:'play',
      selected:false
    },
    {
      title:'PODCAST',
      icon:'podcast',
      selected:false
    },
    {
      title:'ARTICLE',
      icon:'article',
      selected:false
    }                
  ]

  }

 

  goAhead(){
    this.goAhedClick.emit({});
    this.router.navigateByUrl(`content-upload/${this.options[this.optionSelectedIndex].title}`);
  }

  selectThisOption(item,i=0){
    this.options.forEach((opt)=>{
      opt.selected=false;
    })
    item.selected=true;
    this.optionSelected = true;
    this.optionSelectedIndex = i;
  }

  getSelectedClas(item){
    let className='btn-outline-semi-light';
    if(item.selected){
      className = 'btn-outline-primary';
    }

    return className;
  }

  getButtonClass(){
    let btnClass='btn-outline-secondary';
    if(this.optionSelected){  
      btnClass = 'btn-success'
    }

    return btnClass;
  }

}
