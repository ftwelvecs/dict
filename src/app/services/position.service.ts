import {Injectable} from "@angular/core";
import {Position} from "../components/positions/position.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Service} from "./service.interface";
import {AuthHolderService} from "./auth-holder.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PositionService implements Service {

  constructor(
    private http: HttpClient,
    private authHolderService: AuthHolderService
  ) {
  }

  getPositions(): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)

    return this.http.get(`${environment.url}/position`, {headers: headers});
  }

  save(position: any): Observable<any> {
    //  устанавливаем кодировку в заголовок запроса
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
    // post метод принимает три параметра:
    // 1. url - путь к серверу
    // 2. body - объект, который нужно передать
    // 3. конфигурационный объект
    return this.http.post(`${environment.url}/position`, position, {headers: headers})
  }

  edit(position: any): Observable<any> {
    const pos: Position = {
      id: position.id,
      name: position.name
    }
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
    return this.http.put(`${environment.url}/position`, pos, {headers})
  }

  delete(position: any): Observable<any> {
    const pos: Position = {
      id: position.id,
      name: position.name
    }
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
    return this.http.delete(`${environment.url}/position`, {
      headers: headers,
      body: pos
    });
  }

}
