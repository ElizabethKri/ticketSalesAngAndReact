import { Injectable } from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {Observable, Subject} from "rxjs";
import {ITour} from "../../models/tours"
import {ITourTypeSelect} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private ticketServiceRest: TicketRestService) { }

  private ticketSubject = new Subject<ITourTypeSelect>()

//Вызывает метод ticketServiceRest
  getTickets(): Observable<ITour[]>{
    return this.ticketServiceRest.getTickets()
  }

  // 1 вариант доступа к Observable
  readonly ticketType$ = this.ticketSubject.asObservable();

  // 2 вариант доступа к Observable
  // getTicketTypeObservable(): Observable<ITourTypeSelect> {
  //   return this.ticketSubject.asObservable();
  // }
  //
  // updateTour(type:ITourTypeSelect): void {
  //   this.ticketSubject.next(type);
  // }

}
