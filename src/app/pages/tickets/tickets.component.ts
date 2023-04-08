import { Component, OnInit } from '@angular/core';
import {IMenuType} from "../../models/menuType";
import {Subscription} from "rxjs";
import {ITourTypeSelect} from "../../models/tours";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  selectedType: IMenuType;
  private ticketService: any;
  private tourUnsubscriber: Subscription;

  constructor() { }

  ngOnInit(): void {
    //сформировать подписку на ticketSubject
    //1 вариант
    //this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data:ITourTypeSelect) =>{console.log('data', data) });
    //2 вариант
    this.tourUnsubscriber = this.ticketService.getTicketTypeObservable().subscribe((data:ITourTypeSelect) =>
    {console.log('data', data) });
  }

  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }


}
