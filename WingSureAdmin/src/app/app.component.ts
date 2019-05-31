import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbModal }  from '@ng-bootstrap/ng-bootstrap';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'app';
  @ViewChild('uploadWindowTPL') uploadWindowTPL = null;
  loginProperties = null;

  constructor(private router:Router, private modalService: NgbModal){
    this.loginProperties = {
      loggedIn:false,
      user:null
    }
  }

  ngOnInit(){
    this.router.events.subscribe((e)=>{
      if(e instanceof NavigationEnd){
        if(!this.loginProperties.loggedIn){
          window.location.hash="login";
        }
      }
    })
  }

  onUploadScreenRequest(){
    this.modalService.dismissAll();
  }

  uploadAction($event){
    
    this.modalService.open(this.uploadWindowTPL,{windowClass:'upload-action-modal',size:'lg'});
  }

}


