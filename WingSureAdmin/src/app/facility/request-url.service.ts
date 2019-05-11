import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestURLService {

  private baseURL = 'http://ec2-18-236-104-250.us-west-2.compute.amazonaws.com:8080/';
  constructor() { }

  private urlBOX = {
    fileUpload:'wingsure_crop_insurance-0.0.1/rest/api/uploadfile'
  };
  getBaseURL(){
    return this.baseURL;
  }
  getAPIURLS(){
    return this.urlBOX;
  }
}
