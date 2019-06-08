import { Component, OnInit, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {RawHttpService} from '../../facility/raw-http.service';
import {AuthTokenObject} from '../../datatypes/Datatypes';
import {CommonRequestInterceptor} from '../../interceptors/CommonRequestInterceptor.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.less']
})
export class LoginScreenComponent implements OnInit {

  public loginFormMain:FormGroup = null;
  public whenLoginSuccessful = new EventEmitter<AuthTokenObject>();
  public loginError = false;
  constructor(
    private http:RawHttpService,
    private interceptor:CommonRequestInterceptor
    ) { 
    
  }

  

  submitAction(e){
    e.preventDefault();
    
    if(this.loginFormMain.valid){
      
      const frmData = new FormData();
      frmData.set('grant_type','password');
      frmData.set('username',this.loginFormMain.value.toSigninUserName);
      frmData.set('password',this.loginFormMain.value.toSigninPassword);  
      
      this.http.request(frmData,'POST','/oauth/token',true,'wingsure','password123',true).subscribe((tokenData:AuthTokenObject)=>{
        if(tokenData.access_token){
          this.interceptor.saveToken(tokenData);
        }else{
          this.loginError = true;
        }
        
      },(error)=>{
        this.loginError = true;
      });
      
    }
  }

  ngOnInit() {
    window['wingsureCarouselSetup']();
    this.loginFormMain = new FormGroup({
      toSigninUserName : new FormControl('',Validators.required),
      toSigninPassword : new FormControl('',Validators.required)      
    });

    
    
  }

}
