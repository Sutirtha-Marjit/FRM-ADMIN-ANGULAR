import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpParams} from '@angular/common/http';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FileUploadService} from '../../../facility/file-upload.service';

@Component({
  selector: 'app-upload-expand-screen',
  templateUrl: './upload-expand-screen.component.html',
  styleUrls: ['./upload-expand-screen.component.less']
})
export class UploadExpandScreenComponent implements OnInit {


  private operationClass='';
  public tplChoice=null;
  
  public Editor = ClassicEditor;
  public editorData=`<h4>Welcome</h4>
  <p>Pen and paper are impatient for your creation. 
  Go ahead and start an article. 
  <br/><br/><br/><br/>
  Your creation is a <span class="text-success"><b>priceless reward</b></span>  to us... :) </p><br/><br/><br/><br/>`;
  articlePreviewOn=false;
  aertclePreviewHTML = '';
  articleTitle='';
  
  constructor(
    private activateRoute:ActivatedRoute,
    private fUploadService:FileUploadService,
    private http:HttpClient
    ) {

   }

  ngOnInit() {
    this.activateRoute.params.subscribe((params)=>{
        this.tplChoice = params.mediaType;
    });
  }

  articlePublish(){
  /*  const params = new HttpParams();
    params.append('tags','farm');
    params.append('tags','farm');
    this.http.post('/api/articles/add',{params:);*/
      alert('article posted!');
  }

  articlePreview(signal){
      this.articlePreviewOn = signal;
      if(this.articlePreviewOn){
        this.aertclePreviewHTML = this.editorData
      }
  }


  dragoverTest(ev){
    ev.preventDefault();
    this.operationClass  ='operation';
  }

  dropTest(ev:DragEvent){
    
    ev.preventDefault();
    this.operationClass  ='';
    this.fUploadService.handleUpload(ev.dataTransfer.items);
  }

  getOperationClass(){
    return this.operationClass;
  }

}
