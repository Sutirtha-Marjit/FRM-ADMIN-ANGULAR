import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthTokenObject} from './../datatypes/Datatypes';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonRequestInterceptor implements HttpInterceptor{
    private token='';

    intercept(receivedRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let request=null;
        const tempURL = receivedRequest.url.charAt(0)==='/'? receivedRequest.url : `/${receivedRequest.url}`;
        const modfURL = `${environment.API_ROOT}${tempURL}`;

        const tokenObj = this.extractToken();
        if(tokenObj){
            this.token = this.extractToken().access_token;
        }else{
            this.goToLoginPage();
        }
        
        if(receivedRequest.url.indexOf('oauth/token')>-1){
            request = receivedRequest.clone({               
                url:modfURL               
            });
        }else{
            request = receivedRequest.clone({
                withCredentials:true,
                url:modfURL,
                setHeaders: {
                    Authorization : `Bearer ${this.token}`                    
                }
            });
        }

        
        
        return next.handle(request);
    }

    goToLoginPage(){

    }

    saveToken(tokenObj:AuthTokenObject){
        window.sessionStorage.setItem('tokenObj',JSON.stringify(tokenObj));
    }

    extractToken():AuthTokenObject{
        let tokenObj = JSON.parse(window.sessionStorage.getItem('tokenObj'));
        return tokenObj;
    }

    createFormDataObj(obj:any):FormData{
        const frmData = new FormData();
        const keys = Object.keys(obj);

        keys.forEach((key)=>{
            frmData.set(key,obj[key]);
        });

        return frmData;
    }


}