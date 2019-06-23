import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestURLService {

  private baseURL = 'http://ec2-18-236-104-250.us-west-2.compute.amazonaws.com:8080/';
  constructor() { }

  private urlBOX = {
    statBoxTimeSlotDetails:'/api/env/get',
    statBoxTotal:'/api/articles/total',
    statBoxLiked:'/api/article/history/total/liked',
    statBoxLikedPercentage:'/api/articles/history/percentage/liked',
    statBoxDownloaded:'/api/article/history/total/downloaded',
    statBoxDownloadedPercentage:'/api/articles/history/percentage/downloaded',
    statBoxViewed:'/api/article/history/total/viewed',
    statBoxViewedPercentage:'/api/articles/history/percentage/viewed',
    trending:'',
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
