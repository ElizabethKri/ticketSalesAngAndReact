import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITour} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {


  constructor(private http: HttpClient) { }

  //метод формирует запрос
  getTickets(): Observable<ITour[]> {
    return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/')
  }
}
