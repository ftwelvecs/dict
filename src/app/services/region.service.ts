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
    return this.http.get<Array<Region>>(`${environment.url}/region`, {headers: this.getHeaders()})
  }

  save(region: any): Observable<any> {
    return this.http.post(`${environment.url}/region`, region, {headers: this.getHeaders()});
  }

  edit(region: any): Observable<any> {
    return this.http.put(`${environment.url}/region`, region, {headers: this.getHeaders()});
  }

  delete(region: any): Observable<any> {
    return this.http.delete(`${environment.url}/region`, {headers: this.getHeaders(), body: region});
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`);
  }
}
