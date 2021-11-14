import {
  Component, ContentChild,
  ElementRef,
  EventEmitter,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import {Department} from "./department.interface";
import {RegionService} from "../services/region.service";
import {Region} from "../region/region.interface";
import {DepartmentService} from "../services/department.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-department',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  @ViewChild('departmentNameInput') departmentNameInput:ElementRef
  @ViewChild('regionSelect') regionSelect: ElementRef
  @ContentChild('divElement') divElement:ElementRef
  // @Output() onDepartmentAdded: EventEmitter<Department> = new EventEmitter<Department>()

  regions: Array<Region> = []
  departments: Array<Department> = []

  constructor(private regionService: RegionService,
              private departmentService: DepartmentService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // связали массив в RegionService со своим внутренним массивом
    this.regions = this.regionService.regions
    this.departments = this.departmentService.departments
  }

  add() {
    let regionName = this.regionSelect.nativeElement.value;
    const region: any = this.regionService.findByName(regionName)
    const department: Department = {
      name: this.departmentNameInput.nativeElement.value,
      region: region
    }
    this.departmentService.add(department)
  }

  navigate(department: Department) {
    this.router.navigate([department.name], {relativeTo: this.route})
  }

}
