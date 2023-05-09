import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser | null;
  private token: string | null;


  constructor() { }

  getUser(): IUser | null {
    return this.user
    // возвращается user
  };
  setUser(user: IUser) {
    this.user = user
    // записывается пользователь в this.user
  };

  setToken(token: string): void{
    this.token = token;
    window.localStorage.setItem('token', token)

    // записывает приватное поле
  }
  setToStore(token: string): void{
    this.token = token;
    window.localStorage.setItem('token', token)
  }

  getToken(): string | null{
   return  this.token || window.localStorage.getItem('token');
    // возвращает приватное поле
  }

  removeUser(): void {
  this.user = null;
  this.token = null;

}
}
