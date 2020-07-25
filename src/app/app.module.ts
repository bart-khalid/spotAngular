import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {root} from 'rxjs/internal-compatibility';
import {AppRoutingModule} from './app-routing.module';
import { ActionsComponent } from './components/actions/actions.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  ButtonModule, InputSwitchModule,
  InputTextModule,
  MenuModule,
  ProgressSpinnerModule,
  SidebarModule,
  TableModule,
  ToastModule,
  TooltipModule
} from 'primeng';
import {CommonModule} from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import { MyInfosComponent } from './components/my-infos/my-infos.component';
import { MySpotsComponent } from './components/my-spots/my-spots.component';
import { HelpComponent } from './components/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ActionsComponent,
    MyInfosComponent,
    MySpotsComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AccordionModule,
    BrowserAnimationsModule,
    ToastModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MenuModule,
    SidebarModule,
    TooltipModule,
    ButtonModule,
    ProgressSpinnerModule,
    TableModule,
    InputTextModule,
    InputSwitchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
