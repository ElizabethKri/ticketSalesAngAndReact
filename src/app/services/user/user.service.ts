import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser;
  private token: string;


  constructor() { }

  getUser(): IUser {
    return this.user
    // возвращается user
  };
  setUser(user: IUser) {
    this.user = user
    // записывается пользователь в this.user
  };

  setToken(token: string): void{
    this.token = token;
    // записывает приватное поле
  }

  getToken(): string{
   return  this.token;
    // возвращает приватное поле
  }
}
