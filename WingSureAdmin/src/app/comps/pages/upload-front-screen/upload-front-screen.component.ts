import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-front-screen',
  templateUrl: './upload-front-screen.component.html',
  styleUrls: ['./upload-front-screen.component.less']
})
export class UploadFrontScreenComponent implements OnInit {

  optionSelected = false;
  options = [];
  constructor() { }


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

  selectThisOption(item){
    this.options.forEach((opt)=>{
      opt.selected=false;
    })
    item.selected=true;
    this.optionSelected = true;
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
