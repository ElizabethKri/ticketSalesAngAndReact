import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import {SettingComponent} from "./setting.component";
import { ChangePasswordComponent } from './change-password/change-password.component';
import {TabViewModule} from "primeng/tabview";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import { StatisticComponent } from './statistic/statistic.component';
import {TableModule} from "primeng/table";
import { TourLoaderComponent } from './tour-loader/tour-loader.component';


@NgModule({
  declarations: [SettingComponent, ChangePasswordComponent, StatisticComponent, TourLoaderComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SettingRoutingModule,
    TabViewModule,
    FormsModule,
    InputTextModule,
    TableModule
  ]
})
export class SettingModule { }
