import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { AuthGuard } from './auth.guard';
import { CreateComponent } from './component/create/create.component';
import { ViewPageComponent } from './component/view-page/view-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login/registration', component: RegistrationComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] },
  { path: 'dashboard/create', component: CreateComponent  , canActivate: [AuthGuard]},
  { path: 'viewPage/:id', component: ViewPageComponent   , canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
