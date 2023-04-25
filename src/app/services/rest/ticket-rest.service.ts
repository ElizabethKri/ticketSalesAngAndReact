import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {INearestTour, ITour, ITourLocation} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {


  constructor(private http: HttpClient) { }

  //метод формирует запрос
  getTickets(): Observable<ITour[]> {
    return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/');
  }

  //сформирован запрос на неверный эндпоинт
  getRestError(): Observable<ITour[]> {
    return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }
  // ближайший тур
  getNearestTickets():Observable<INearestTour[]>{
    return this.http.get<INearestTour[]>(' https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/');
  }
  //локация
  getLocationList():Observable<ITourLocation[]>{
    return this.http.get<ITourLocation[]>('  https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/');
  }

  getRandomNearestEvent(type: number): Observable<INearestTour> {
    switch (type){
      case 0:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours1.json')
      case 1:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours2.json')
      case 2:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours3.json')
      default:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours2.json')
    }
  }

  sendTourData(data: any): Observable<any>{
    return this.http.post('/assets/mocks/', data)
  }

}
