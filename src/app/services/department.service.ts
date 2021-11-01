import { Injectable } from '@angular/core';
import {Department} from "../department/department.interface";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departments: Array<Department> = []

  constructor() { }

  add(department: Department) {
    this.departments.push(department)
  }

  findByName(name: string): Department | undefined {
    /*return this.departments.find(function (department) {
      return department.name == name
    })*/
    return this.departments.find(department => department.name == name)
  }
}
