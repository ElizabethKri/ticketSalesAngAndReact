import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {map, Observable} from "rxjs";
import {IOrder} from "../../../models/order";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../services/user/user.service";
import {IUser} from "../../../models/users";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
orders: IOrder[] = [];
  cols = [
    // по field отображаются свойства
    {field: 'tourId', header: 'Имя'},
  ];
  constructor(private  datePipe: DatePipe,
              private http:HttpClient, private userService: UserService) { }

  getOrderList(): Observable<IOrder[]>{
    const id = this.userService.getUser()?.id;


    return this.http.get<IOrder[]>(`http://localhost:3000/order/${id}`).pipe(
      map((data) => {
        const newArr: IOrder[] =[];
        data.forEach((el) => {
          const newObj: IOrder = {
            age: el.age,
            birthDay: this.datePipe.transform(el.birthDay, 'yyyy-mm-dd'),
            cardNumber: el.cardNumber,
            tourId: el.tourId,
            userId: el.userId
          }
          newArr.push(newObj)
        })
        return newArr
      }
    ))
  }
  ngOnInit(): void {
    this.getOrderList().subscribe((orders) => {
      this.orders = orders;
    })
  }

}
