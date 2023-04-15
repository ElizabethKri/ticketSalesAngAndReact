import {Input, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AsideComponent } from './aside/aside.component';
import {MenubarModule} from 'primeng/menubar';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {BlockStyleDirective} from "../../directive/block-style.directive";
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from "primeng/calendar";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
    TicketsComponent,
    HeaderComponent,
    FooterComponent,
    TicketListComponent,
    AsideComponent,
    BlockStyleDirective,
  ],
  imports: [
    FormsModule,
    CommonModule,
    TicketsRoutingModule,
    MenubarModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class TicketsModule { }
