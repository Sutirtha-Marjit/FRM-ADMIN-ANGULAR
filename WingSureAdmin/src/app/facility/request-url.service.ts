import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestURLService {

  private baseURL = 'http://ec2-18-236-104-250.us-west-2.compute.amazonaws.com:8080/';
  constructor() { }

  private urlBOX = {
    statBoxTimeSlotDetails:'/api/env/get',
    statBoxTotal:'/api/con/total',
    statBoxLiked:'/api/con/liked',
    statBoxDownloaded:'/api/con/downloaded',
    statBoxViewed:'/api/con/viewed',
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
