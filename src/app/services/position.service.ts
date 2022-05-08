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

  positions: Array<Position> = []

  constructor(
    private http: HttpClient,
    private authHolderService: AuthHolderService
  ) {
    this.reload()
  }

  // метод обновляет данные из сервера
  reload() {
    // добавляем заголовок authorization при каждом вызове в бэк
    const token = this.authHolderService.token;
    const headers = new HttpHeaders({Authorization: "Bearer " + token});
    // обнуляем существующий массив
    this.positions.length = 0;
    this.http.get(`${environment.url}/position`, {headers: headers}) // можно написать {headers}
      .subscribe(data => {
        // ложим данные в массив
        this.positions.push(...<Array<Position>> data)
      })
  }

  add(position: Position) {
    this.positions.push(position)
  }

  save(position: any) {
    //  устанавливаем кодировку в заголовок запроса
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
    // post метод принимает три параметра:
    // 1. url - путь к серверу
    // 2. body - объект, который нужно передать
    // 3. конфигурационный объект
    this.http.post(`${environment.url}/position`, position, {headers: headers})
      .subscribe(() => this.reload())
  }

  edit(position: any) {
    const pos: Position = {
      id: position.id,
      name: position.name
    }
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
    this.http.put(`${environment.url}/position`, pos, {headers})
      .subscribe(() => this.reload())
  }

  delete(position: any): Observable<any> {
    const pos: Position = {
      id: position.id,
      name: position.name
    }
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
    const response = this.http.delete(`${environment.url}/position`, {
      headers: headers,
      body: pos
    })

    response.subscribe(() => {
      this.reload()
    })

    return response;
  }

}
