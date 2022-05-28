import {Injectable} from "@angular/core";
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
    return this.http.get(`${environment.url}/position`, {headers: this.getHeaders()});
  }

  save(position: any): Observable<any> {
    return this.http.post(`${environment.url}/position`, position, {headers: this.getHeaders()})
  }

  edit(position: any): Observable<any> {
    return this.http.put(`${environment.url}/position`, position, {headers: this.getHeaders()})
  }

  delete(position: any): Observable<any> {
    return this.http.delete(`${environment.url}/position`, {headers: this.getHeaders(), body: position});
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
  }

}
