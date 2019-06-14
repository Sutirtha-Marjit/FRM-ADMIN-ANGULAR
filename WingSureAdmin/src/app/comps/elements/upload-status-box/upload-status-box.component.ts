import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { FileUploadStatusInfo } from '../../../datatypes/Datatypes';
import { FileUploadService } from '../../../facility/file-upload.service';
import { RequestURLService } from '../../../facility/request-url.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-upload-status-box',
  templateUrl: './upload-status-box.component.html',
  styleUrls: ['./upload-status-box.component.less']
})
export class UploadStatusBoxComponent implements OnInit, OnChanges {


  bgImage: any;
  localVideoPath = '';
  uploadVarName = 'file';
  uploadError = {
    error:false,
    errorDetails:{
      heading:'',
      description:'',
      code:''
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
  constructor(
    private fUploadService: FileUploadService,
    private urlService: RequestURLService
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
      const formData = new FormData();
      formData.append(this.uploadVarName, this.info.file);
      this.fUploadService.fileUpload({
        mediaType: this.info.mediaTYpe,
        url: this.urlService.getAPIURLS().fileUpload,
        data: formData
      }).subscribe((successData) => {
        this.info.inProgress = false;
        this.uploadError.error = true;
        console.log(successData);
      }, (errorData:HttpErrorResponse) => {
        console.log(errorData);
        this.info.inProgress = false;
        this.uploadError.error = true;
        this.uploadError.errorDetails = {
          heading:'Upload Error',
          code:`${errorData.status}`,
          description:errorData.message
        }
      });

    }
  }

  getExactFileSize(size) {
    const s = (size / 1024) / 1024;
    return `${s.toFixed(2)}MB`;
  }

  ngOnChanges() {
    console.log(this.info);
    this.showSelectedFIle(this.info.file);


  }

  ngOnInit() {
    this.uploadAction();

  }

}
