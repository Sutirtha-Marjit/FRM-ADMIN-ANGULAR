import { Component, OnInit , Input, Output, OnChanges} from '@angular/core';
import {FileUploadStatusInfo} from '../../../datatypes/Datatypes';

@Component({
  selector: 'app-upload-status-box',
  templateUrl: './upload-status-box.component.html',
  styleUrls: ['./upload-status-box.component.less']
})
export class UploadStatusBoxComponent implements OnInit, OnChanges {


  bgImage:any;
  localVideoPath='';

  @Input() info:FileUploadStatusInfo = {
    
      id: 'NONE',
      contentURL: '',
      inProgress: false,
      title: '',
      description: '',
      tags: '',
      mediaTYpe: null,
      defaultThumbnailPath: ''
    
  }
  constructor() { }

  showSelectedFIle(fileObj){
    if(this.info.mediaTYpe==='IMAGE'){

      if(FileReader){
        const fReader = new FileReader();
        fReader.onload = (e:any)=>{
          this.bgImage =  e.target.result;
        };
        fReader.readAsDataURL(fileObj);

      }
      
    }else{
      
      if(FileReader){
        const fReader = new FileReader();
        fReader.onload = (e:any)=>{
          this.localVideoPath =  e.target.result;
        };
        fReader.readAsDataURL(fileObj);

      }
    }
    
  }

  getExactFileSize(size){
    const s = (size/1024)/1024;
    return `${s.toFixed(2)}MB`;
  }

  ngOnChanges(){
    this.showSelectedFIle(this.info.file);
    
  }

  ngOnInit() {
  }

}
