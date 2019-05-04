import { Injectable } from '@angular/core';
import {} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  public handleUpload(list:DataTransferItemList){
    const frmData:FormData = new FormData();  
    if(list && list.length>0){
        for(let i=0;i<list.length;i++){
          if(list.item(i).kind==='file'){
            const file = list.item(i).getAsFile();
            frmData.append('toupload',file);
          }

        }
      }
  }

}
