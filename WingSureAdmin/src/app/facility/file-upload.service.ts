import { Injectable } from '@angular/core';
import {} from '@angular/forms';
import {AdvFormData} from '../datatypes/Datatypes';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private fileTypes = {
    image:['image/jpg','image/jpeg','image/png','image/bmp'],
    video:['video/x-flv','video/mp4','application/x-mpegURL','video/MP2T','video/3gpp','video/quicktime','video/x-msvideo','video/x-ms-wmv'],
    article:[]
  }
  constructor() { }

  checkAllow(fileType,allowMediaType){
    if(allowMediaType==='IMAGE'){
      return this.fileTypes.image.indexOf(fileType)>-1;
    }
    if(allowMediaType==='VIDEO'){
      return this.fileTypes.video.indexOf(fileType)>-1;
    }
    if(allowMediaType==='ARTICLE'){
      return true;
    }
  }

  prepareFormDataForInputFile(list:FileList,type):AdvFormData{
    const rejected = [];
    const advFormData:AdvFormData = {meta:[],data:null};
    const frmData:FormData = new FormData();
    if(list.length>0){
      for(let i=0;i<list.length;i++){
        const file = list[i];
        if(this.checkAllow(file.type,type)){
          advFormData.meta.push({name:file.name, filetype:file.type});
          frmData.append(`toupload_${i}`,file);
        }else{
          rejected.push(file);
        }        
      }
    }
    advFormData.rejecteds = rejected;
    advFormData.data = frmData;
    return advFormData;
    

  }

  prepareFormData(list:DataTransferItemList,type):AdvFormData{
    const rejected = [];
    const advFormData:AdvFormData = {meta:[],data:null};
    const frmData:FormData = new FormData();  
    if(list && list.length>0){
        for(let i=0;i<list.length;i++){
          
          if(list[i].kind==='file'){
            const file = list[i].getAsFile();
            if(this.checkAllow(list[i].type,type)){
              advFormData.meta.push({name:file.name,filetype:list[i].type});
              frmData.append(`toupload_${i}`,file);
            }else{
              rejected.push(file);
            }
            
          }

        }
      }
      advFormData.data = frmData;
      advFormData.rejecteds = rejected;
      return advFormData;     
  }


  handleUpload(){
    
  }

}
