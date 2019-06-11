import { Injectable } from '@angular/core';
import {} from '@angular/forms';
import {AdvFormData} from '../datatypes/Datatypes';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private fileTypes = {
    image:['image/jpg','image/jpeg','image/png','image/bmp'],
    video:[''],
    article:[]
  }
  constructor() { }

  checkAllow(fileType,allowMediaType){
    if(allowMediaType==='IMAGE'){
      return this.fileTypes.image.indexOf(fileType)>-1;
    }
    if(allowMediaType==='VIDEO'){
      return true;
    }
    if(allowMediaType==='ARTICLE'){
      return true;
    }
  }

  prepareFormData(list:DataTransferItemList,type):AdvFormData{
    const advFormData:AdvFormData = {meta:[],data:null};
    const frmData:FormData = new FormData();  
    if(list && list.length>0){
        for(let i=0;i<list.length;i++){
          
          if(list[i].kind==='file'){
            const file = list[i].getAsFile();
            if(this.checkAllow(list[i].type,type)){
              advFormData.meta.push({name:file.name,filetype:list[i].type});
              frmData.append(`toupload_${i}`,file);
            }
            
          }

        }
      }
      advFormData.data = frmData;
      if(advFormData.meta.length){
        return advFormData;
      }
      return null;
  }


  handleUpload(){
    
  }

}
