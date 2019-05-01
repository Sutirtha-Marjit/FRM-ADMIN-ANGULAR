import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './comps/pages/dashboard/dashboard.component';
import { UploadExpandScreenComponent } from './comps/pages/upload-expand-screen/upload-expand-screen.component';

const routes: Routes = [
  {path:'admin-dashboard',component:DashboardComponent},
  {path:'',pathMatch:'full',redirectTo:'admin-dashboard'},
  {path:'dashboard',pathMatch:'full',redirectTo:'admin-dashboard'},
  {path:'content-upload',component:UploadExpandScreenComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
