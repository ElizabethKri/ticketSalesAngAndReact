import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { OrdersComponent } from './orders.component';
import {TableModule} from "primeng/table";



@NgModule({
    declarations: [
        OrdersComponent
    ],
    exports: [
        OrdersComponent
    ],
  imports: [
    CommonModule,
    TableModule
  ],
  providers: [DatePipe]
})
export class OrdersModule { }
