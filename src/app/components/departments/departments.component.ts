import {
  Component, ContentChild,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {Department} from "./department.interface";
import {RegionService} from "../../services/region.service";
import {Region} from "../region/region.interface";
import {DepartmentService} from "../../services/department.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../shared/modal/modal.component";

@Component({
  selector: 'app-department',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit, OnDestroy {

  @ContentChild('divElement') divElement: ElementRef
  // @Output() onDepartmentAdded: EventEmitter<Department> = new EventEmitter<Department>()

  regions: Array<Region> = []
  departments: Array<Department> = []

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
              private route: ActivatedRoute,
              public dialog: MatDialog) {
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

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
      data: {
        title: 'Добавление департамента',
        fields: this.departmentFields,
        buttons: [{
          color: 'primary',
          action: (element: any) => {
            this.departmentService.save(element)
            dialogRef.close()
          },
          label: 'Сохранить'
        },{
          action: () => dialogRef.close(),
          label: 'Закрыть'
        }]
      }
    })
  }

  edit(department: Department) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
      data: {
        title: 'Редактирование департамента',
        fields: this.departmentFields,
        element: {
          id: department.id,
          name: department.name,
          regionId: department.region.id
        },
        buttons: [{
          color: 'primary',
          action: (element: any) => {
            this.departmentService.edit(element)
            dialogRef.close()
          },
          label: 'Редактировать'
        },{
          action: () => dialogRef.close(),
          label: 'Закрыть'
        }],
      }
    })
  }

  delete(department: Department) {
    this.departmentService.delete(department)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  navigate(department: Department) {
    this.router.navigate([department.name], {relativeTo: this.route})
  }

}
