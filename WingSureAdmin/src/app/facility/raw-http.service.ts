import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RawHttpService {

  private http;  
  constructor() {

   }

   private stateChanged(){

   }

   private fixDataType(responseText){
        const data = {
            data:null,
            type:''
        }
        try{
            data.data = JSON.parse(responseText);
            data.type = 'object';
        }catch{
            data.data = responseText;
            data.type = 'string';
        }

        return data;
   }

   private post(data,url, async, user, password):Observable<any>{
    const prHandler = (resolve,reject)=>{

        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = ()=>{
            if(xmlhttp.readyState === 4){
                
                if(xmlhttp.status >=400){
                    
                    reject(this.fixDataType(xmlhttp.responseText).data);
                }

                if(xmlhttp.status >=200 && xmlhttp.status <300){
                    
                    resolve(this.fixDataType(xmlhttp.responseText).data);
                }

            }
        };
        xmlhttp.open('POST',url,async,user,password);        
        xmlhttp.withCredentials = true;
        xmlhttp.send(data);

    };

    return from(new Promise(prHandler));
   }

   request(data={},method='GET', url, async=false, user=null, password=null,forlogin=false):Observable<any>{
    if(method==='POST' && url && async && user && password && forlogin){
        url = `${environment.API_ROOT}${url}`;
        return this.post(data,url, async, user, password);
    }

   }
}
