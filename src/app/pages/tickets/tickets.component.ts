import { Component, OnInit } from '@angular/core';
import {IMenuType} from "../../models/menuType";
import {Subscription} from "rxjs";
import {ITourTypeSelect} from "../../models/tours";
import {TicketService} from "../../services/tickets/ticket.service";
import {ConfigService} from "../../services/config-service/config-service.service";
import {IConfig} from "../../models/config";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  selectedType: IMenuType;
  private tourUnsubscriber: Subscription;
  private config: IConfig = ConfigService.config;

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    console.log('this.conf', this.config.baseIndexHref)
    //сформировать подписку на ticketSubject
    //1 вариант
    this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data:ITourTypeSelect) =>{console.log('data', data) });
    //2 вариант
  //   this.tourUnsubscriber = this.ticketService.getTicketTypeObservable().subscribe((data:ITourTypeSelect) =>
  //   {console.log('data', data) });
   }

  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }


}
