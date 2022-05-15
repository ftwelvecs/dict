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
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)

    return this.http.get<Department[]>(`${environment.url}/department`, {headers})
  }

  save(department: any): Observable<any> {
    const dep: Department = {
      name: department.name,
      region: {
        id: department.regionId
      }
    }
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
    return this.http.post(`${environment.url}/department`, dep, {headers})
  }

  edit(department: any): Observable<any> {
    const dep: Department = {
      id: department.id,
      name: department.name,
      region: {
        id: department.regionId
      }
    }

    const headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)

    return this.http.put(`${environment.url}/department`, dep, {headers})
  }

  delete(department: any): Observable<any> {
    const dep: Department = {
      id: department.id,
      name: department.name,
      region: {
        id: department.regionId
      }
    }

    const headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)

    return this.http.delete(`${environment.url}/department`, {
      headers: headers,
      body: dep
    })
  }
}
