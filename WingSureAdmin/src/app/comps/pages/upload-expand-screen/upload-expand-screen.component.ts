import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpParams} from '@angular/common/http';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FileUploadService} from '../../../facility/file-upload.service';
import {CommonRequestInterceptor} from '../../../interceptors/CommonRequestInterceptor.service';
import {FileUploadStatusInfo, AdvFormData} from '../../../datatypes/Datatypes';

@Component({
  selector: 'app-upload-expand-screen',
  templateUrl: './upload-expand-screen.component.html',
  styleUrls: ['./upload-expand-screen.component.less']
})
export class UploadExpandScreenComponent implements OnInit {


  private operationClass='';
  tplChoice=null;
  
  Editor = ClassicEditor;
  editorData=`<h4>Welcome</h4>
  <p>Pen and paper are impatient for your creation. 
  Go ahead and start an article. 
  <br/><br/><br/><br/>
  Your creation is a <span class="text-success"><b>priceless reward</b></span>  to us... :) </p><br/><br/><br/><br/>`;
  articlePreviewOn=false;
  aertclePreviewHTML = '';
  articleTitle='';
  
  fileUploadPipe:Array<FileUploadStatusInfo> = [];

  constructor(
    private activateRoute:ActivatedRoute,
    private fUploadService:FileUploadService,
    private http:HttpClient,
    private cmnRI:CommonRequestInterceptor
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
    //alert('article posted!');
    const toPost = {
      tags:'farm,innovation,indian,myth,truth',
      comment:'lorem ipsum dolor to uivit',
      title:'Article01',
      content_type:this.tplChoice,
      uploaded_file_name:'',
      content_url:'',
      uploaded_by:'sut',
      uploaded_file_size:'0'
    };

    this.http.post('/api/articles/add',this.cmnRI.createFormDataObj(toPost)).subscribe(()=>{},()=>{});
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
    this.manageUploadStatusList(this.fUploadService.prepareFormData(ev.dataTransfer.items,this.tplChoice));
    
  }

  manageUploadStatusList(advFrmData: AdvFormData) {

    advFrmData.meta.forEach((el,i) => {

      const a: FileUploadStatusInfo = {
        id: `${Math.random()}`.replace('.', el.name),
        contentURL: '',
        inProgress: false,
        title: 'An Image',
        description: 'Some description...',
        tags: 'insurance,agriculture',
        mediaTYpe: this.tplChoice,
        defaultThumbnailPath: '',
        file:advFrmData.data.get(`toupload_${i}`)
      };
      
      this.fileUploadPipe.push(a);
      
    })

    window.scrollTo(0,550);
    
  }

  getOperationClass(){
    return this.operationClass;
  }

}
