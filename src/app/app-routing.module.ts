import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {LoginComponent} from './components/login/login.component';
import {ActionsComponent} from './components/actions/actions.component';
import {HomeComponent} from './components/home/home.component';
import {MySpotsComponent} from './components/my-spots/my-spots.component';
import {MyInfosComponent} from './components/my-infos/my-infos.component';
import {HelpComponent} from './components/help/help.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'actions', component: ActionsComponent,  children: [
      {path: 'home', component: HomeComponent},
      {path: 'mySpots', component: MySpotsComponent},
      {path: 'myInfos', component: MyInfosComponent},
      {path: 'help', component: HelpComponent}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
