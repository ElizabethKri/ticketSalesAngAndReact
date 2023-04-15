import { Injectable } from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {map, Observable, Subject} from "rxjs";
import {ITour} from "../../models/tours"
import {ITourTypeSelect} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private ticketServiceRest: TicketRestService) { }

  private ticketSubject = new Subject<ITourTypeSelect>()


  // 1 вариант доступа к Observable
  readonly ticketType$ = this.ticketSubject.asObservable();

  // 2 вариант доступа к Observable
  // getTicketTypeObservable(): Observable<ITourTypeSelect> {
  //   return this.ticketSubject.asObservable();
  // }

 updateTour(type:ITourTypeSelect): void {
   this.ticketSubject.next(type);
  }

  //Вызывает метод ticketServiceRest
  getTickets(): Observable<ITour[]>{
   //возвращает Observable, добавляем одиночные туры (не 2, а 4)
    return this.ticketServiceRest.getTickets().pipe(map(
      //изменение данных полученные сервисом (преобразование данных)
      (value) => {
        const singleTour = value.filter((el) => el.type === "single")
        return value.concat(singleTour)
      }
    ));
  }
  //возвращает результат вызова getRestError
   getError(): Observable<ITour> {
    return this.ticketServiceRest.getRestError()
   }



}
