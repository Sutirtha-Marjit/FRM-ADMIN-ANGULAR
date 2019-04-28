import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalComponent } from './comps/utils/modal/modal.component';
import { UserWelcomeComponent } from './comps/utils/user-welcome/user-welcome.component';
import { StatisticsCakeComponent } from './comps/elements/statistics-cake/statistics-cake.component';
import { DashboardComponent } from './comps/pages/dashboard/dashboard.component';
import { ManageContentComponent } from './comps/pages/manage-content/manage-content.component';
import { HeaderSegmentComponent } from './comps/utils/header-segment/header-segment.component';
import { SelectBoxComponent } from './comps/utils/select-box/select-box.component';
import { HighchartsChartModule } from 'highcharts-angular';

import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    UserWelcomeComponent,
    StatisticsCakeComponent,
    DashboardComponent,
    ManageContentComponent,
    HeaderSegmentComponent,
    SelectBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbDropdownModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
