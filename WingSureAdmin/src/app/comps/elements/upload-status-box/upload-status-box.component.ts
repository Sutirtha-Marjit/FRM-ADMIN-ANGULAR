import { Component, OnInit, Input, OnChanges, Output ,EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FileUploadStatusInfo } from '../../../datatypes/Datatypes';
import { FileUploadService } from '../../../facility/file-upload.service';
import { RequestURLService } from '../../../facility/request-url.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-upload-status-box',
  templateUrl: './upload-status-box.component.html',
  styleUrls: ['./upload-status-box.component.less']
})
export class UploadStatusBoxComponent implements OnInit, OnChanges {


  bgImage: any;
  finalized = false;
  finalizedError = false;

  localVideoPath = '';
  uploadVarName = 'file';
  uploadedFileName = '';
  uploadError = {
    error: false,
    errorDetails: {
      heading: '',
      description: '',
      code: ''
    }
  }

  @Input() info: FileUploadStatusInfo = {

    id: 'NONE',
    contentURL: '',
    inProgress: true,
    title: '',
    description: '',
    tags: '',
    mediaTYpe: null,
    defaultThumbnailPath: ''

  }

  @Output() onActionComplete = new EventEmitter<FileUploadStatusInfo>();
  constructor(
    private fUploadService: FileUploadService,
    private urlService: RequestURLService,
    private http:HttpClient
  ) { }

  showSelectedFIle(fileObj) {
    if (this.info.mediaTYpe === 'IMAGE') {

      if (FileReader) {
        const fReader = new FileReader();
        fReader.onload = (e: any) => {
          this.bgImage = e.target.result;
        };
        fReader.readAsDataURL(fileObj);

      }

    } else {

      if (FileReader) {
        const fReader = new FileReader();
        fReader.onload = (e: any) => {
          this.localVideoPath = e.target.result;
        };
        try {
          fReader.readAsDataURL(fileObj);
        } catch (e) {
          console.log(e);
          //this.uploadError.errorDetails = 
        }


      }
    }

  }

  uploadAction() {
    if (this.info.file) {
      this.info.inProgress = true;
      this.uploadError.error = false;
      const formData = new FormData();
      formData.append(this.uploadVarName, this.info.file);
      this.fUploadService.fileUpload(
        this.info.mediaTYpe,
        this.urlService.getAPIURLS().fileUpload,
        formData
      ).subscribe((successData: any) => {
        this.info.inProgress = false;
        this.uploadError.error = false;
        this.info.contentURL = successData.fileDownloadUri;
        this.uploadedFileName = successData.fileName;

      }, (errorData: HttpErrorResponse) => {

        this.info.inProgress = false;
        this.uploadError.error = true;
        this.uploadError.errorDetails = {
          heading: 'Upload Error',
          code: `${errorData.status}`,
          description: errorData.message
        }
      });

    }
  }

  getExactFileSize(size) {
    const s = (size / 1024) / 1024;
    return `${s.toFixed(2)}MB`;
  }

  publishContent() {
    const toPost = {
      tags:this.info.tags,
      comment:this.info.description,
      title:this.info.title,
      content_type:this.info.mediaTYpe,
      uploaded_file_name:this.uploadedFileName,
      content_url:this.info.contentURL,
      uploaded_by:'unknown user',
      uploaded_file_size:'0'
    };
    
    this.http.post(this.urlService.getAPIURLS().add,toPost).subscribe(()=>{
      this.finalized = true;
      setTimeout(()=>{
        this.onActionComplete.emit(this.info);
      },2800);
    },()=>{

    });
  }

  ngOnChanges() {
    
    this.showSelectedFIle(this.info.file);


  }

  ngOnInit() {
    this.uploadAction();

  }

}
