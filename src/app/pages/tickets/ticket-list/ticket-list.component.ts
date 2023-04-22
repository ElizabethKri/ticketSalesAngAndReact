import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TicketService} from "../../../services/tickets/ticket.service";
import {ITour, ITourTypeSelect} from "../../../models/tours";
import { Router} from "@angular/router";
import {TiсketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {BlockStyleDirective} from "../../../directive/block-style.directive";
import {debounceTime, fromEvent, Subscription} from "rxjs";


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];
  ticketsCopy: ITour[];
  renderComplete = false;
  private tourUnsubscriber: Subscription

  @ViewChild('tourWrap', {read: BlockStyleDirective}) blockDirective: BlockStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketSearchValue: string;
  arr: string;


  constructor(private ticketService: TicketService,
              private router: Router,
              private ticketStorage: TiсketsStorageService,
             ) { }

  //Подписаться на изменения, которые произойдут при запросе на сервер, параметром передается асинхронная операция (data)
  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data; //вставка нового шаблона
        this.ticketsCopy = [...this.tickets] //содержит все данные
        this.ticketStorage.setStorage(data); // запрос на тур записывается

      }
    )
    //сформировать подписку на ticketSubject
    //1 вариант
    this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data: ITourTypeSelect) => {
      console.log('data', data)
    //2 вариант
    //this.tourUnsubscriber = this.ticketService.getTicketTypeObservable().subscribe((data:ITourTypeSelect) => {  console.log('data', data)  });
    // в методе подписки на изменение типа тура добавлена логика обработки данных
      let ticketType: string;
      switch (data.value) {
        case "single":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
          break;
        case "multi":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
          break;
        case "all":
          this.tickets = [...this.ticketsCopy];
          break;

      }
      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue',dateValue)
        this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
      }

      //this.tickets добавлен метод директивы
      setTimeout(() => {

        this.blockDirective.updateItems();

        this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
      });
    });
  }
  ngAfterViewInit(){
    const fromEventOberver = fromEvent(this.ticketSearch.nativeElement, "keyup")
    this.searchTicketSub = fromEventOberver.pipe(
      debounceTime(200)).subscribe((ev: any) => {
        if (this.ticketSearchValue) {
          //чтобы искалось при любом регистре
          const arr = this.ticketSearchValue[0].toUpperCase() + this.ticketSearchValue.slice(1).toLowerCase()
          this.tickets = this.ticketsCopy.filter((el) => el.name.includes(arr));
        } else {
          this.tickets = [...this.ticketsCopy]
        }
      }
    );
  }
  //выполняется отписка
  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
  }


  goToTicketInfoPage(item: ITour){
    this.router.navigate([`/tickets/ticket/${item.id}`])
  }

  directiveRenderComplete(ev: boolean){
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background-color: #f5f5dc')
    this.blockDirective.initStyle(0)
    this.renderComplete = true
  }
// поиск туров
  findTours(ev: Event):void{
    const searchValue = (<HTMLInputElement>ev.target).value;

    if(searchValue){
      this.tickets = this.ticketsCopy.filter((el) => el.name.includes(searchValue));
    }
    else {
      this.tickets = [...this.ticketsCopy]
    }
  }

}
