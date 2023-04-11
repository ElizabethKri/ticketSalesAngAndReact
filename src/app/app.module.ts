import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthService} from "./services/auth/auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RestInspectorsService} from "./services/inspectors/rest-inspectors.service";


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,

  ],
  providers: [{
    //зарезервированный токен, который хранит в себе в виде массива все экземпляры класса HTTP_INTERCEPTORS
    //добавляем заголовок авторизации пользователя (ко всем запросам на сервис добавлялся заголовок)
    provide: HTTP_INTERCEPTORS, useClass: RestInspectorsService, multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
