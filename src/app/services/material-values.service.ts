import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../components/users/user.interface";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthHolderService} from "./auth-holder.service";
import {MaterialValues} from "../components/material-values/material-values.interface";

@Injectable({
  providedIn: 'root'
})

export class MaterialValuesService{


  constructor(
    private http: HttpClient,
    private authHolderService: AuthHolderService
  ) {
  }

  getMaterialValues(): Observable<MaterialValues[]> {
    return this.http.get<MaterialValues[]>(`${environment.url}/material_values`, {headers: this.getHeaders()})
  }
//Observable - источник для слушания
  save(materialValues: MaterialValues): Observable<any> {
    return this.http.post(`${environment.url}/material_values`, materialValues, {headers: this.getHeaders()})
  }

  edit(materialValues: MaterialValues): Observable<any> {
    return this.http.put(`${environment.url}/material_values`, materialValues, {headers: this.getHeaders()})
  }

  delete(materialValues: MaterialValues): Observable<any> {
    return this.http.delete(`${environment.url}/material_values`, {headers: this.getHeaders(), body: materialValues})
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
  }

}
