import { Component, ViewChild } from '@angular/core';
import { NgbModal }  from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app';
  @ViewChild('uploadWindowTPL') uploadWindowTPL = null;

  constructor(private modalService: NgbModal){

  }

  uploadAction($event){
    
    this.modalService.open(this.uploadWindowTPL,{windowClass:'upload-action-modal',size:'lg'});
  }

}


