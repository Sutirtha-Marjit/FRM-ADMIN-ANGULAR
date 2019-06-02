import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ModalComponent } from './comps/utils/modal/modal.component';
import { UserWelcomeComponent } from './comps/utils/user-welcome/user-welcome.component';
import { StatisticsCakeComponent } from './comps/elements/statistics-cake/statistics-cake.component';
import { DashboardComponent } from './comps/pages/dashboard/dashboard.component';
import { ManageContentComponent } from './comps/pages/manage-content/manage-content.component';
import { HeaderSegmentComponent } from './comps/utils/header-segment/header-segment.component';
import { SelectBoxComponent } from './comps/utils/select-box/select-box.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import {NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { UploadFrontScreenComponent } from './comps/pages/upload-front-screen/upload-front-screen.component';
import { UploadExpandScreenComponent } from './comps/pages/upload-expand-screen/upload-expand-screen.component';
import { UploadStateMonitorComponent } from './comps/elements/upload-state-monitor/upload-state-monitor.component';
import { LoginScreenComponent } from './comps/login-screen/login-screen.component'

import {CommonRequestInterceptor} from './interceptors/CommonRequestInterceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    UserWelcomeComponent,
    StatisticsCakeComponent,
    DashboardComponent,
    ManageContentComponent,
    HeaderSegmentComponent,
    SelectBoxComponent,
    UploadFrontScreenComponent,
    UploadExpandScreenComponent,
    UploadStateMonitorComponent,
    LoginScreenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbDropdownModule,
    NgbModalModule,
    HighchartsChartModule,
    CKEditorModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:CommonRequestInterceptor,multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
