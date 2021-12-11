import {Region} from "../region/region.interface";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Service} from "./service.interface";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegionService implements Service {
  private regions: Array<Region> = []

  constructor(private http: HttpClient) {
    this.reload()
  }

  private reload() {
    this.http.get(`${environment.url}/region/getAll`)
      .subscribe(data => {
        this.regions.length = 0
        this.regions.push(...<Array<Region>> data)
      })
  }

  add(region: Region) {
    this.regions.push(region)
  }

  getRegions(): Observable<Array<Region>>  {
    return this.http.get<Array<Region>>(`${environment.url}/region/getAll`)
  }

  findByName(name: string): Region | undefined {
    return this.regions.find(region => region.name == name)
  }

  save(region:any) {
    //  устанавливаем кодировку в заголовок запроса
    let headers = new HttpHeaders().set('Content-type', 'application/json; charset=utf-8')
    // post метод принимает три параметра:
    // 1. url - путь к серверу
    // 2. body - объект, который нужно передать
    // 3. конфигурационный объект
    this.http.post(`${environment.url}/region/create`, region, {headers: headers})
      .subscribe(() => this.reload())
  }
}
