import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ISettings} from "../../models/setting";

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private  settingsSubject: Subject<ISettings> = new Subject<ISettings>();

  constructor() { }

  loadUserSettings(): Observable<ISettings>{
    const settingObservable = new Observable<ISettings>((subscriber) =>{
      const settingsData: ISettings ={
        saveToken : true
      };
      subscriber.next(settingsData)
    })
    return settingObservable;
  }

  //subject
  //доставляет данные всем подписчикам и передаем фактические данные
  loadUserSettingsSubject(data: ISettings): any{
    this.settingsSubject.next(data)
  }

  getSettingsSubjectObservable(): Observable<ISettings>{
    return this.settingsSubject.asObservable()
  }
}
