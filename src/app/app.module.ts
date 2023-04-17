import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthService} from "./services/auth/auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RestInspectorsService} from "./services/inspectors/rest-inspectors.service";
import {ConfigService} from "./services/config-service/config-service.service";

function initializeApp(config: ConfigService) {
  return () => config.loadPromise().then(() => {
    console.log('---CONFIG LOADED--', ConfigService.config)
  });
}

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
  providers: [
    ConfigService,
    {
      //токен
      provide: APP_INITIALIZER,
      // определяем, что должно вызываться при старте
      useFactory: initializeApp,
      //что сначала запускаем
      deps: [ConfigService], multi: true
    },
    {
    //зарезервированный токен, который хранит в себе в виде массива все экземпляры класса HTTP_INTERCEPTORS
    //добавляем заголовок авторизации пользователя (ко всем запросам на сервис добавлялся заголовок)
    provide: HTTP_INTERCEPTORS, useClass: RestInspectorsService, multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }


