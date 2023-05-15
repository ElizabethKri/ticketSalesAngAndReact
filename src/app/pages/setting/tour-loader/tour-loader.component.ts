import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TicketService} from "../../../services/tickets/ticket.service";

@Component({
  selector: 'app-tour-loader',
  templateUrl: './tour-loader.component.html',
  styleUrls: ['./tour-loader.component.scss']
})
export class TourLoaderComponent implements OnInit {
  tourForm: FormGroup;
  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.tourForm = new FormGroup({
      name: new FormControl('', {validators: Validators.required}),
      description: new FormControl('', [Validators.required, Validators.minLength(2)]),
      operator: new FormControl(),
      price: new FormControl(),
      img: new FormControl(),
    });
  }

  createTour(): void {
    //считывает все значения
    const tourDataRow = this.tourForm.getRawValue();
    //отправка данных разных типов
    let formParams = new FormData();
    if (typeof tourDataRow === "object"){
      for (let prop in tourDataRow){
        //prop - ключ
        formParams.append(prop, tourDataRow[prop])
      }
    }
    this.ticketService.createTour(formParams).subscribe(() => {})
  }

  //файлы
  selectFile(ev: any): void {
    console.log('ev', ev)
    if (ev.target.files.length > 0){
      const file = ev.target.files[0];
      //добавляет значение
      this.tourForm.patchValue({
        img: file
      })
    }
  }

}
