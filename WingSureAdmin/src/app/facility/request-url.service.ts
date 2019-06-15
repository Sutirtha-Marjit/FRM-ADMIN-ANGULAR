import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestURLService {

  private baseURL = 'http://ec2-18-236-104-250.us-west-2.compute.amazonaws.com:8080/';
  constructor() { }

  private urlBOX = {
    fileUpload:'/admin/api/uploadfile',
    add:'/api/articles/add'
  };
  getBaseURL(){
    return this.baseURL;
  }
  getAPIURLS(){
    return this.urlBOX;
  }
}
