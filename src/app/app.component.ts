import { Component } from '@angular/core';
import {Department} from "./department/department.interface";
import {Region} from "./region/region.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  departments: Array<Department> = []
  regions: Array<Region> = []

  departmentAdded(department: Department) {
    this.departments.push(department)
  }

  regionAdded(region: Region) {
    this.regions.push(region)
  }
}
