import {Component, OnInit} from '@angular/core';
import {Department} from "./department/department.interface";
import {Region} from "./region/region.interface";
import {Address} from "./address/address.interface";
import {RegionService} from "./services/region.service";

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
  addresses: Array<Address> = []

  constructor(private regionService: RegionService) {
  }

  ngOnInit() {
    // связали массив в RegionService со своим внутренним массивом
    this.regions = this.regionService.regions
  }

  departmentAdded(department: Department) {
    this.departments.push(department)
  }

  // делегируем добавления регионов RegionService
  /*regionAdded(region: Region) {
    this.regions.push(region)
  }*/

  addressAdded(address: Address) {
    this.addresses.push(address)
  }
}
