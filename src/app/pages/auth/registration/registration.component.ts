import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {ConfigService} from "../../../services/config-service/config-service.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login: string;
  psw: string;
  pswRepeat: string;
  email: string;
  cardNumber: string;
  saveValue: boolean;
  showCardNumber: boolean;
  id: string;
  saveUserInStore: boolean;


  constructor(private messageService: MessageService,
              private authService: AuthService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard
  }

  saveUser(): void{

  }

  registration(ev: Event): void | boolean {
    if (this.psw !== this.pswRepeat){
      this.messageService.add({severity:'error', summary: 'Ошибка', detail: 'Пароли не совпадают'});
      return false;
    }
    const userObj: IUser = {
      psw: this.psw,
      cardNumber: this.cardNumber,
      login: this.login,
      email: this.email,
      id: this.id,
    }
//test
    const userNest = {
      age: 30,
      name: 'Test'
    }

    this.http.post('http://localhost:3000/users/', userObj).subscribe((data) =>{
      if (this.saveUserInStore) {
        const objUserJsonStr = JSON.stringify(userObj);
        window.localStorage.setItem('user_'+userObj.login, objUserJsonStr);
      }
      this.messageService.add({severity:'success', summary:'Регистрация прошла успешно'});

    }, ()=> {
      this.messageService.add({severity:'warn', summary:'Пользователь уже зарегистрирован'});
    });

    // //Пользователь есть/нет
    // if (!this.authService.isUserExists(userObj)){
    //   this.authService.setUser(userObj);
    //   this.messageService.add({severity:'success', summary: 'Успех!', detail: 'Регистрация прошла успешно'});
    // }
    // else {
    //   this.messageService.add({severity:'warn', summary: 'Неудача', detail: 'Пользователь уже зарегистрирован'});
    // }
    // if (this.saveValue){
    //   window.localStorage.setItem('userLogin:' + `${userObj.login}`, JSON.stringify(userObj));
    // }

  }

}
