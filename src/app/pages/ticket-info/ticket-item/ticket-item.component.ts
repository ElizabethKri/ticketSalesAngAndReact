import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ICustomTicketData, INearestTour, ITour, ITourLocation} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TiсketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {forkJoin, fromEvent, Subscription} from "rxjs";
import {TicketService} from "../../../services/tickets/ticket.service";
import {IOrder} from "../../../models/order";




@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  ticket: ITour | undefined;
  user: IUser | null;
  userForm: FormGroup;

  nearestTours: ICustomTicketData[];
  tourLocation: ITourLocation[];
  ticketSearchValue: string;
  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  //определяем различные инпоинты, тип запроса на сервер
  searchTypes = [1, 2, 3]

  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  constructor(private route: ActivatedRoute,
              private ticketStorage: TiсketsStorageService,
              private userService: UserService,
              private ticketService: TicketService) { }

  ngOnInit(): void {
    //записываем пользователя
    this.user = this.userService.getUser()
    //создание формГруппы
    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(this.user?.cardNumber),
      birthDay: new FormControl(''),
      age: new FormControl(),
      citizen: new FormControl('')
    });
    //формирует объединение массива с их значениями !важен порядок
     forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) =>{
       console.log('data', data)
       this.tourLocation = data[1];
       this.nearestTours = this.ticketService.transformData(data[0],data[1]);
     })


    //считываем параметры
    const routeIdParam = this.route.snapshot.paramMap.get('id'); // значение, которое передано при маршрутизации (связано с тек. роутингом)
    const queryIDParam = this.route.snapshot.queryParamMap.get('id'); // глобальный Map всех параметров
    //записываем значение либо одного параметра или другого
    const paramValueId = routeIdParam || queryIDParam
    //если есть возвращает массив и ищет нужный элемент
    if(paramValueId){
      this.ticketService.getTicketById(paramValueId).subscribe((data: ITour) =>{
        this.ticket = data;
      })
      // const ticketStorage = this.ticketStorage.getStorage() //возвращает массив
      // this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      // console.log('this.ticket', this.ticket)
    }
  }

  ngAfterViewInit(): void{
    //setCardNumber
    //обращаемся на ссылку группу форм, значение карты
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);
    // this.userForm.patchValue ({
    // cardNumber: this.user.cardNumber
    //});

    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup')
    this.searchTicketSub = fromEventObserver.subscribe((ev: any) => {
      this.initSearchTour()
    })
  }

  ngOnDestroy(): void{
    this.searchTicketSub.unsubscribe();
  }

  initSearchTour():void {
    //определяем значение, которое будет в рандомном порядке (0.1, 0.2, 0.3)
    const type = Math.floor(Math.random() * this.searchTypes.length);
    //в случае долгого запроса могли от него отписаться
    if (this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe();
    }
    //записываем результат запроса на сервер
    this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data) => {
      this.nearestTours = this.ticketService.transformData([data], this.tourLocation)
    })
  }

  onSubmit(): void{

  }
// при заполнении формы, запишется в консоль
  initTour(): void {
    //получаем наши данные
    const userData = this.userForm.getRawValue();
    //информация о туре + личная информация
    const postData = {...this.ticket, ...userData};
    this.ticketService.sendTourData(postData).subscribe()
    // console.log('postData', postData)
    // console.log('   this.userForm.getRawValue()', this.userForm.getRawValue())

    const userId = this.userService.getUser()?.id || null;
    const postObj: IOrder = {
      age: postData.age,
      birthDay: postData.birthDay,
      cardNumber: postData.cardNumber,
      tourId: postData._id,
      userId: userId,
    }
    this.ticketService.sendTourData(postObj).subscribe()
  }

  selectDate(ev: Event): void{

  }

}
