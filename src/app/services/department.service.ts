import { Injectable } from '@angular/core';
import {Department} from "../departments/department.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departments: Array<Department> = []

  constructor(private http: HttpClient) {
    // обращаемся в бэк
    this.http.get(`${environment.url}/department/getAll`)
      .subscribe(data => {
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
}
