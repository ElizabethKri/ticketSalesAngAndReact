import {Component, OnDestroy, OnInit} from '@angular/core';
import {ObservableExampleService} from "../../services/testing/testing.service";
import {Subject, Subscription, take, takeUntil} from "rxjs";
import {SettingService} from "../../services/setting/setting.service";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit, OnDestroy {
  // private subjectScope: Subject<string>;
  // private  subjectUnsubscribe: Subscription;
  // settingsData: Subscription;
  // settingsDataSubject: Subscription;
  private subjectForUnsubscribe = new Subject()


  constructor(private testing : ObservableExampleService,
              private settingService: SettingService) {

  }

  ngOnInit(): void {
    //если Subject произведет данные, то автоматически будет отписка слушателей
    this.settingService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) =>{console.log('settings data', data)});
    //может произойти утечка памяти без pipe(takeUntil(this.subjectForUnsubscribe))
    this.settingService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(
    (data) => {
        console.log('settings data from subject', data)
      })

    //settingsData observable
    //каждый раз, когда входим в настройки
    // this.settingsData = this.settingService.loadUserSettings().subscribe((data) =>{
    //   console.log('settings data', data)
    //
    // //setting data subject
    //   //данные получаем, после того, как кликаем обновить настройки
    //   //получаем данные 1 раз и отписываемся
    // this.settingsDataSubject = this.settingService.getSettingsSubjectObservable().pipe(take(1)).subscribe(
    // (data) => {
    //     console.log('settings data from subject', data)
    //   })
    // })
    // this.subjectScope = this.testing.getSubject();
    //
    // // const myObservable = this.testing.getSubject();
    // // // сразу получаем данные
    // // const unsubscribe = myObservable.subscribe((data) => {
    // //   console.log('***observer data', data)
    // // })
    // //
    // // unsubscribe.unsubscribe();
    //
    //
    // // подписка
    // this.subjectUnsubscribe = this.subjectScope.subscribe((data) => {
    //    console.log('***data', data)
    // });
    // //отправляем данные
    // this.subjectScope.next('subData value');

  }
  // Отписка
  ngOnDestroy() {
    // отправим данные + метод complete
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
    // this.settingsData.unsubscribe();
    // this.subjectUnsubscribe.unsubscribe()
  }




}
