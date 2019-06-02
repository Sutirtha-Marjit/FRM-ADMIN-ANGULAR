import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.less']
})
export class LoginScreenComponent implements OnInit {

  public loginFormMain:FormGroup = null;
  
  constructor(private http:HttpClient) { 
    
  }

  submitAction(e){
    e.preventDefault();
    
    if(this.loginFormMain.valid){
      
      const frmData = new FormData();
      frmData.set('grant_type','password');
      frmData.set('username',this.loginFormMain.value.toSigninUserName);
      frmData.set('password',this.loginFormMain.value.toSigninPassword);     
      this.http.post('oauth/token',frmData)
      .subscribe((data:any)=>{
        alert(JSON.stringify(data));
      },(error)=>{
        alert(JSON.stringify(error));
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
