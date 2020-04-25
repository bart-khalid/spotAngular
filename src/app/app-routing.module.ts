import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {LoginComponent} from './components/login/login.component';
import {ActionsComponent} from './components/actions/actions.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'actions', component: ActionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
