import { Component, OnInit } from '@angular/core';
import {ICustomStatisticUser} from "../../../models/users";
import {StatisticService} from "../../../services/statistic/statistic.service";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  cols = [
    // по field отображаются свойства
    {field: 'name', header: 'Имя'},
    {field: 'company', header: 'Компания'},
    {field: 'phone', header: 'Телефон'},
    {field: 'city', header: 'Город'},
    {field: 'street', header: 'Улица'},
  ];
  users: ICustomStatisticUser[];


  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.statisticService.getUserStatistic().subscribe((data) => {
      this.users = data;
    })
  }

}
