import { Component, OnInit } from '@angular/core';
import {INearestTour, ITour, ITourLocation} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TiсketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {forkJoin} from "rxjs";
import {TicketService} from "../../../services/tickets/ticket.service";



@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  ticket: ITour | undefined;
  user: IUser | null;
  userForm: FormGroup;

  nearestTours: INearestTour[];
  tourLocation: ITourLocation[];

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
       this.nearestTours = this.ticketService.transformData(data[0],data[1]);
       this.tourLocation = data[1];
     })


    //считываем параметры
    const routeIdParam = this.route.snapshot.paramMap.get('id'); // значение, которое передано при маршрутизации (связано с тек. роутингом)
    const queryIDParam = this.route.snapshot.queryParamMap.get('id'); // глобальный Map всех параметров
    //записываем значение либо одного параметра или другого
    const paramValueId = routeIdParam || queryIDParam
    //если есть возвращает массив и ищет нужный элемент
    if(paramValueId){
      const ticketStorage = this.ticketStorage.getStorage() //возвращает массив
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket)
    }
  }

  ngAfterViewInit(): void{
    //setCardNumber
    //обращаемся на ссылку группу форм, значение карты
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);
    // this.userForm.patchValue ({
    // cardNumber: this.user.cardNumber
    //});
  }

  onSubmit(): void{

  }

  selectDate(ev: Event): void{

  }

}
