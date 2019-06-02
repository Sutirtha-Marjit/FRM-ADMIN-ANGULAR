import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonRequestInterceptor implements HttpInterceptor{
    token = '474747ds4da74fsdfsdfs44s4dfsdfsdf1csad7ff7ds788784654d4asw23123da';
    intercept(receivedRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let request=null;
        const tempURL = receivedRequest.url.charAt(0)==='/'? receivedRequest.url : `/${receivedRequest.url}`;
        const modfURL = `${environment.API_ROOT}${tempURL}`;

        if(receivedRequest.url.indexOf('oauth/token')>-1){
            request = receivedRequest.clone({               
                url:modfURL               
            });
        }else{
            request = receivedRequest.clone({
                withCredentials:true,
                url:modfURL,
                setHeaders: {
                    Authorization : `Bearer ${this.token}`,
                    Application : 'Winsure-Admin-Front-end',
                    FrontEnd :'Angular 6'
                }
            });
        }

        
        
        return next.handle(request);
    }


}