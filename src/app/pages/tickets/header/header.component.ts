import { Component, OnInit, OnDestroy, SimpleChanges, Input} from '@angular/core';
import {MenuItem} from "primeng/api";
import {IUser} from "../../../models/users";
import {UserService} from "../../../services/user/user.service";
import {IMenuType} from "../../../models/menuType";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  @Input() menuType: IMenuType;
  private  settingsActive = false;
  items: MenuItem[];
  // Отображение даты
  time: Date;
  private timerInterval: number;
  public user: IUser | null;




  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.items = this.initMenuItems()
    // запись пользователя
    this.user = this.userService.getUser()

    this.timerInterval = window.setInterval(() =>
    {
      console.log('run')
     this.time = new Date();
    }, 1000)

  }
  //Когда выходим компонент уничтожается, в избежании утечки памяти
  ngOnDestroy(): void{
    if (this.timerInterval){
      window.clearInterval(this.timerInterval)
    }

  }

  ngOnChanges(ev: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();
  }

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink:['tickets-list']
      },
      {
        label: 'Настройки',
        routerLink:['setting'],
        visible: this.settingsActive
      },
      {
        label: 'Выйти',
        routerLink:['/auth'],
        command: () => {
          this.userService.removeUser()
        }
      },

    ];
  }



}
