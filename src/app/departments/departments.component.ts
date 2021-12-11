import {
  Component, ContentChild,
  ElementRef,
  EventEmitter, OnDestroy,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import {Department} from "./department.interface";
import {RegionService} from "../services/region.service";
import {Region} from "../region/region.interface";
import {DepartmentService} from "../services/department.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-department',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit, OnDestroy {

  @ViewChild('departmentNameInput') departmentNameInput: ElementRef
  @ViewChild('regionSelect') regionSelect: ElementRef
  @ContentChild('divElement') divElement: ElementRef
  // @Output() onDepartmentAdded: EventEmitter<Department> = new EventEmitter<Department>()

  regions: Array<Region> = []
  departments: Array<Department> = []
  modalId = 'departmentModal'
  modalTitle = 'Добавление департамента'
  departmentFields = [{
    id: 'departmentName',
    label: 'Название департамента',
    // значение соответствует поле объекта, который будет сохранен
    // например при post запросе значение будет использоваться как ключ
    // post -> { name: 'Какое-то значение' }
    name: 'name',
    type: 'text',
    controlType: 'input'
  }, {
    id: 'regions',
    label: 'Список регионов',
    controlType: 'select',
    options: this.regions,
    displayValue: 'name',
    setValue: 'id',
    name: 'regionId'
  }]

  private subscription: Subscription

  constructor(private regionService: RegionService,
              public departmentService: DepartmentService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // связали массив в RegionService со своим внутренним массивом
    this.departments = this.departmentService.departments
    this.subscription = this.regionService.getRegions()
      .subscribe(data => {
        this.regions.length = 0
        this.regions.push(...data)
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  navigate(department: Department) {
    this.router.navigate([department.name], {relativeTo: this.route})
  }

}
