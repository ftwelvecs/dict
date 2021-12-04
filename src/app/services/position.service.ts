import {Injectable} from "@angular/core";
import {Position} from "../positions/position.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Service} from "./service.interface";

@Injectable({
  providedIn: 'root'
})
export class PositionService implements Service {

  positions: Array<Position> = []

  constructor(private http: HttpClient) {
    this.reload()
  }

  // метод обновляет данные из сервера
  reload() {
    // обнуляем существующий массив
    this.positions.length = 0;
    this.http.get(`${environment.url}/position/getAll`)
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
    let headers = new HttpHeaders().set('Content-type', 'application/json; charset=utf-8')
    // post метод принимает три параметра:
    // 1. url - путь к серверу
    // 2. body - объект, который нужно передать
    // 3. конфигурационный объект
    this.http.post(`${environment.url}/position/create`, position, {headers: headers})
      .subscribe(() => this.reload())
  }

}
