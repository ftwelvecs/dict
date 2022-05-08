import {Injectable} from '@angular/core';
import {Department} from "../components/departments/department.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Service} from "./service.interface";
import {AuthHolderService} from "./auth-holder.service";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService implements Service {

  departments: Array<Department> = []

  constructor(private http: HttpClient, private authHolderService: AuthHolderService) {
    // обращаемся в бэк
    this.reload()
  }

  reload() {

    // добавляем заголовок authorization при каждом вызове в бэк
    const token = this.authHolderService.token;
    const headers = new HttpHeaders({Authorization: "Bearer " + token});

    this.http.get(`${environment.url}/department`, {headers})
      .subscribe(data => {
        this.departments.length = 0
        this.departments.push(...<Array<Department>> data)
      })
  }

  add(department: Department) {
    this.departments.push(department)
  }

  findByName(name: string): Department | undefined {
    /*
      два вызова метода идентичны между собой
      return this.departments.find(function (department) {
        return department.name == name
      })
    */
    return this.departments.find(department => department.name == name)
  }

  save(department: any) {
    const dep: Department = {
      name: department.name,
      region: {
        id: department.regionId
      }
    }
    let headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
    this.http.post(`${environment.url}/department`, dep, {headers})
      .subscribe(() => this.reload())
  }

  edit(department: any) {
    const dep: Department = {
      id: department.id,
      name: department.name,
      region: {
        id: department.regionId
      }
    }

    let headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
    this.http.put(`${environment.url}/department`, dep, {headers})
      .subscribe(() => this.reload())
  }

  delete(department: any) {
    const dep: Department = {
      id: department.id,
      name: department.name,
      region: {
        id: department.regionId
      }
    }

    let headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
    this.http.delete(`${environment.url}/department`, {
      headers: headers,
      body: dep
    })
      .subscribe(() => this.reload())
  }
}
