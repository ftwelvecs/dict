import {Component, OnInit} from '@angular/core';
import {Department} from "./department.interface";
import {RegionService} from "../../services/region.service";
import {Region} from "../region/region.interface";
import {DepartmentService} from "../../services/department.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../shared/modal/modal.component";
import {MatTableDataSource} from "@angular/material/table";
import {Position} from "../positions/position.interface";

@Component({
  selector: 'app-department',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  regions: Array<Region> = []

  dataSource = new MatTableDataSource<Position>();

  displayedColumns = ['id', 'name', 'region', 'menu']

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

  constructor(private regionService: RegionService,
              public departmentService: DepartmentService,
              private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.load()
    // связали массив в RegionService со своим внутренним массивом
    this.regionService.getRegions()
      .subscribe(data => {
        this.regions.length = 0
        this.regions.push(...data)
      })
  }

  load() {
    this.departmentService.getDepartments()
      .subscribe(data => this.dataSource.data = data)
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
              .subscribe(() => this.load())
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
          regionId: department.region?.id
        },
        buttons: [{
          color: 'primary',
          action: (element: any) => {
            this.departmentService.edit(element)
              .subscribe(() => this.load())
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
      .subscribe(() => this.load())
  }

  navigate(department: Department) {
    this.router.navigate([department.name], {relativeTo: this.route})
  }

}
