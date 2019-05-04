import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
  constructor(private activateRoute:ActivatedRoute) {

   }

  ngOnInit() {
    this.activateRoute.params.subscribe((params)=>{
        this.tplChoice = params.mediaType;
    });
  }

  dragoverTest(){
    this.operationClass  ='operation';
  }

  dropTest(){
    this.operationClass  ='';
  }

  getOperationClass(){
    return this.operationClass;
  }

}
