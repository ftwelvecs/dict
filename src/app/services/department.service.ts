import { Injectable } from '@angular/core';
import {Department} from "../departments/department.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departments: Array<Department> = []

  constructor(private http: HttpClient) {
    this.http.get("./assets/departments.json")
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
