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
  private regions: Array<Region> = []

  constructor(private http: HttpClient, private authHolderService: AuthHolderService) {
    this.reload()
  }

  private reload() {
    // добавляем заголовок authorization при каждом вызове в бэк
    const token = this.authHolderService.token;
    const headers = new HttpHeaders({Authorization: "Bearer " + token});

    this.http.get(`${environment.url}/region`, {headers})
      .subscribe(data => {
        this.regions.length = 0
        this.regions.push(...<Array<Region>> data)
      })
  }

  add(region: Region) {
    this.regions.push(region)
  }

  getRegions(): Observable<Array<Region>>  {
    // добавляем заголовок authorization при каждом вызове в бэк
    const token = this.authHolderService.token;
    const headers = new HttpHeaders({Authorization: "Bearer " + token});
    return this.http.get<Array<Region>>(`${environment.url}/region`, {headers})
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
