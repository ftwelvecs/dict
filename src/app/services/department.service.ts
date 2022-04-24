import { Injectable } from '@angular/core';
import {Department} from "../components/departments/department.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Service} from "./service.interface";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService implements Service {

  departments: Array<Department> = []

  constructor(private http: HttpClient) {
    // обращаемся в бэк
    this.reload()
  }

  reload() {

    this.http.get(`${environment.url}/department/getAll`)
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
    let headers = new HttpHeaders().set('Content-type', 'application/json; charset=utf-8')
    this.http.post(`${environment.url}/department/create`, dep, {headers})
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

    let headers = new HttpHeaders().set('Content-type', 'application/json; charset=utf-8')
    this.http.put(`${environment.url}/department/update`, dep, {headers})
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

    let headers = new HttpHeaders().set('Content-type', 'application/json; charset=utf-8')
    this.http.delete(`${environment.url}/department/delete`, {
      headers: headers,
      body: dep
    })
      .subscribe(() => this.reload())
  }
}
