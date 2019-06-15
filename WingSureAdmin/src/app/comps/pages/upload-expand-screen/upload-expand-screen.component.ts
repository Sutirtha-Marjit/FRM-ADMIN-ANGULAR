import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FileUploadService} from '../../../facility/file-upload.service';
import {CommonRequestInterceptor} from '../../../interceptors/CommonRequestInterceptor.service';
import {FileUploadStatusInfo, AdvFormData, AppErrorObject} from '../../../datatypes/Datatypes';

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
  articlePublished = false;
  articlePreviewOn=false;
  articlePublishError = false;
  articlePublishErrorObj:AppErrorObject = null;
  aertclePreviewHTML = '';
  articleTitle='';
  articleTags='';
  
  fileUploadPipe:Array<FileUploadStatusInfo> = [];


  @ViewChild('fileSelectInput') fileSelectInput = null;
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
        console.log('subs');
    });
  }

  articlePublish(){
  
    const toPost = {
      tags:this.articleTags,
      comment:this.editorData,
      title:this.articleTitle,
      content_type:this.tplChoice,
      uploaded_file_name:'',
      content_url:'',
      uploaded_by:'unknown user',
      uploaded_file_size:'0'
    };

    this.http.post('/api/articles/add',toPost).subscribe((data)=>{
      this.articlePreviewOn = false;
      this.articlePublished = true;
    },(errorData:HttpErrorResponse)=>{
      this.articlePreviewOn = false;
      this.articlePublished = false;
      this.articlePublishError = true;
      this.articlePublishErrorObj = {
        code:`${errorData.status}`,
        heading:errorData.statusText,
        description:errorData.message
      }
      
    });
  }

  articlePreview(signal){
      this.articlePreviewOn = signal;
      if(this.articlePreviewOn){
        this.aertclePreviewHTML = this.editorData
      }
  }

  resetArticleWindow(){
    this.articlePreviewOn=false;
    this.articlePublishError = false;
    this.articlePublished = false;
  }


  openSelectWindow(){
    if(this.fileSelectInput){
      const el = this.fileSelectInput.nativeElement;
      el.click();
    }
  }

  inputFileSelect(e){
    if(e.target && e.target.files && e.target.files.length>0){
      this.manageUploadStatusList(this.fUploadService.prepareFormDataForInputFile(e.target.files,this.tplChoice));
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
        inProgress: true,
        title: 'An Image',
        description: 'Some description...',
        tags: 'insurance,agriculture',
        mediaTYpe: this.tplChoice,
        defaultThumbnailPath: '',
        file:advFrmData.data.get(`toupload_${i}`)
      };
      
      this.fileUploadPipe.push(a);
      
    })
    if(advFrmData.rejecteds.length>0){
      alert(advFrmData.rejecteds.length+' files are incompatible!');
    }
    window.scrollTo(0,550);
    
  }

  getOperationClass(){
    return this.operationClass;
  }

  onActionComplete(e:FileUploadStatusInfo){
    console.log(e);
    let d = this.fileUploadPipe.find((el)=>{
      return el.id === e.id;
    });
    d=null;
  }

 

}
