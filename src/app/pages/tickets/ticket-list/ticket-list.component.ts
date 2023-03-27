import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../../services/tickets/ticket.service";
import {ITour} from "../../../models/tours";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];

  constructor(private ticketService: TicketService) { }

  //Подписаться на изменения, которые произойдут при запросе на сервер, параметром передается асинхронная операция (data)
  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
      }
    )
  }

}