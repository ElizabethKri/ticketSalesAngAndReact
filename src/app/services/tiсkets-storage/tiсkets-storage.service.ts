import { Injectable } from '@angular/core';
import {ITour} from "../../models/tours";


@Injectable({
  providedIn: 'root'
})
export class TiсketsStorageService {
  private ticketStorage: ITour[] = []

  constructor() { }

  setStorage(data: ITour[]): void {
    this.ticketStorage = data;
    // запись данных в this.ticketStorage
  }
  getStorage(): ITour[] {
    return this.ticketStorage;
    // возвращает в this.ticketStorage
  }
}
