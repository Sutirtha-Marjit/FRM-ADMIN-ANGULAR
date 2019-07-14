import { Component, OnInit, AfterViewChecked, EventEmitter, ViewChild } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {RawHttpService} from '../../facility/raw-http.service';
import {AuthTokenObject} from '../../datatypes/Datatypes';
import {CommonRequestInterceptor} from '../../interceptors/CommonRequestInterceptor.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.less']
})
export class LoginScreenComponent implements OnInit , AfterViewChecked{


  @ViewChild('forgotpasswordTPL') forgotpasswordTPL;
  public carouselON=true;
  public loginFormMain:FormGroup = null;
  public forgotPasswordGroup:FormGroup = null;
  public whenLoginSuccessful = new EventEmitter<AuthTokenObject>();
  public loginError = false;
  public inProgress = false;
  constructor(
    private http:RawHttpService,
    private interceptor:CommonRequestInterceptor,
    private router:Router,
    private modalService: NgbModal
    ) { 
    
  }

  

  submitAction(e){
    e.preventDefault();
    this.inProgress = true;
    this.loginError = false;
    if(this.loginFormMain.valid){
      
      const frmData = new FormData();
      frmData.set('grant_type','password');
      frmData.set('username',this.loginFormMain.value.toSigninUserName);
      frmData.set('password',this.loginFormMain.value.toSigninPassword);  
      
      this.http.request(frmData,'POST','/oauth/token',true,'wingsure','password123',true).subscribe((tokenData:AuthTokenObject)=>{
        this.inProgress = false;
        if(tokenData.access_token){
          this.loginError=false;
          this.interceptor.saveToken(tokenData);
          this.whenLoginSuccessful.emit(tokenData);          
        }else{
          this.loginError = true;
        }        
      },(error)=>{
        this.inProgress = false;
        this.loginError = true;
      });
      
    }
  }

  forgotPasswordWindow(){
    if(this.forgotpasswordTPL){
      this.modalService.open(this.forgotpasswordTPL);
    }
    
  }

  ngOnInit() {
    
    
    this.loginFormMain = new FormGroup({
      toSigninUserName : new FormControl('',Validators.required),
      toSigninPassword : new FormControl('',Validators.required)      
    });

    this.forgotPasswordGroup = new FormGroup({
      userEmail : new FormControl('',[Validators.required, Validators.email])
    });
    
    
  }

  ngAfterViewChecked(){
    if(this.carouselON){
      window['wingsureCarouselSetup']();
    }
  }

}
