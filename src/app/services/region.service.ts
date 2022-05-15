import {Region} from "../components/region/region.interface";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Service} from "./service.interface";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AuthHolderService} from "./auth-holder.service";

@Injectable({
  providedIn: 'root'
})
export class RegionService implements Service {

  constructor(
    private http: HttpClient,
    private authHolderService: AuthHolderService
  ) {
  }

  getRegions(): Observable<Array<Region>> {
    // добавляем заголовок authorization при каждом вызове в бэк
    const token = this.authHolderService.token;
    const headers = new HttpHeaders({Authorization: "Bearer " + token});
    return this.http.get<Array<Region>>(`${environment.url}/region`, {headers})
  }

  save(region: any): Observable<any> {
    //  устанавливаем кодировку в заголовок запроса
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
    // post метод принимает три параметра:
    // 1. url - путь к серверу
    // 2. body - объект, который нужно передать
    // 3. конфигурационный объект
    return this.http.post(`${environment.url}/region`, region, {headers: headers});
  }

  edit(region: any): Observable<any> {
    const reg: Region = {
      id: region.id,
      name: region.name
    }
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
    return this.http.put(`${environment.url}/region`, reg, {headers});
  }

  delete(region: any): Observable<any> {
    const reg: Region = {
      id: region.id,
      name: region.name
    }
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)

    return this.http.delete(`${environment.url}/region`, {
      headers: headers,
      body: reg
    });
  }
}
