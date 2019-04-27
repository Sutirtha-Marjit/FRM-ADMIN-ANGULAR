import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './comps/pages/dashboard/dashboard.component';

const routes: Routes = [
  {path:'admin-dashboard',component:DashboardComponent},
  {path:'/',redirectTo:'admin-dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
