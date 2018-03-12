import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {MyAppServiceService} from "./my-app-service.service";

import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './login/login.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';

const appRoute: Routes =[
  {path:'', component: HomeComponent},
  {path:'login', component:LoginComponent}
  ]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [MyAppServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
