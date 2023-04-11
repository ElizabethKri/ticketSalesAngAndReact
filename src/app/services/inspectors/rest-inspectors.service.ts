import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestInspectorsService implements HttpInterceptor{
  constructor(private userService: UserService) { }
  intercept(req: HttpRequest<any>,
            next: HttpHandler):
    Observable<HttpEvent<any>> {

    //возвращает токен
    const hasToken = this.userService.getToken();
    //console.log('hasToken', hasToken)

    if(hasToken) {
      // console.log('hasToken', hasToken)

      //клонирует и формирует новый запрос, который указали в параметре
      const cloned = req.clone({

        //добавление нового заголовка
        headers: req.headers.set("Authorization", "Bearer" + hasToken)
      })

      // формирует запрос (новые данные)
      return next.handle(cloned)

    }
    else {
      // отправляем текущий запрос
      return next.handle(req)
    }

  }
}
