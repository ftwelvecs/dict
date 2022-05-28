import {Injectable} from '@angular/core';
import {Department} from "../components/departments/department.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Service} from "./service.interface";
import {AuthHolderService} from "./auth-holder.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService implements Service {

  constructor(
    private http: HttpClient,
    private authHolderService: AuthHolderService
  ) {
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.url}/department`, {headers: this.getHeaders()})
  }

  save(department: any): Observable<any> {
    return this.http.post(`${environment.url}/department`, department, {headers: this.getHeaders()})
  }

  edit(department: any): Observable<any> {
    return this.http.put(`${environment.url}/department`, department, {headers: this.getHeaders()})
  }

  delete(department: any): Observable<any> {
    return this.http.delete(`${environment.url}/department`, {headers: this.getHeaders(), body: department})
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
  }
}
