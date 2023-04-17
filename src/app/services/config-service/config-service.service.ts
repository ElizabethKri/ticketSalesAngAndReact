import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IConfig} from "../../models/config";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) {
  }

  static config: IConfig;
//запрос на локальный файл и записывает конфигурацию
  configLoad(): void {
    const jsonFile = `assets/config/config.json`;
    this.http.get<IConfig>(jsonFile).subscribe((data) => {
      if (data && typeof (data) === 'object') {
        ConfigService.config = data;
      }
    })

  }

  loadPromise(): Promise <any> {
    const jsonFile = `assets/config/config.json`;
    const configPromise = new Promise<IConfig>((resolve, reject) => {
      //после того как метод от сервера успешно получен вызываем resolve
      this.http.get(jsonFile).toPromise().then((response: any) => {
        if (response && typeof (response) === 'object') {
          ConfigService.config = response;
          const config = ConfigService.config;
          if (config) {
            // set origin host
            resolve(config);
          } else {
            reject('Ошибка при инициализации конфига - неверный формат ' + config);
          }
        } else {
          reject('Ошибка при инициализации конфига - неверный формат ответа ' + response);
        }
        // позволяет регулировать ошибки
      }).catch((response: any) => {
        reject(`Ошибка при загрузки файла '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
    // формирование массива
    const promiseArr = [configPromise];
    return Promise.all(promiseArr);

  }
}
