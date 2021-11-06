import {Component, OnInit} from '@angular/core';
import {Department} from "./department/department.interface";
import {Region} from "./region/region.interface";
import {RegionService} from "./services/region.service";
import {User} from "./users/user.interface";
import {UserService} from "./services/user.service";
import {DepartmentService} from "./services/department.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // можно внедрять внутри компонента,
  // но в данном случае мы получаем новый объект сервиса
  // providers: [RegionService]
})
export class AppComponent implements OnInit {
  departments: Array<Department> = []
  regions: Array<Region> = []
  users: Array<User> = []

  constructor(private regionService: RegionService,
              private departmentService: DepartmentService,
              private userService: UserService) {
  }

  ngOnInit() {
    // связали массив в RegionService со своим внутренним массивом
    this.regions = this.regionService.regions
    this.users = this.userService.users
    this.departments = this.departmentService.departments
  }

  departmentAdded(department: Department) {
    this.departments.push(department)
  }

  // делегируем добавления регионов RegionService
  /*regionAdded(region: Region) {
    this.regions.push(region)
  }*/
}
