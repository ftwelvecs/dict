import {Component, OnInit} from '@angular/core';
import {Department} from "./department.interface";
import {RegionService} from "../../services/region.service";
import {Region} from "../region/region.interface";
import {DepartmentService} from "../../services/department.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {FormModalComponent} from "../../shared/form-modal/form-modal.component";
import {MatTableDataSource} from "@angular/material/table";
import {Position} from "../positions/position.interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-department',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  regions: Array<Region> = []

  dataSource = new MatTableDataSource<Position>();

  displayedColumns = ['id', 'name', 'region', 'menu']

  departmentFields = [
    {
      id: 'departmentName',
      label: 'Название департамента',
      type: 'text',
      controlType: 'input',
      formControlName: 'name'
    },{
      id: 'regions',
      label: 'Список регионов',
      controlType: 'select',
      options: this.regions,
      displayValue: 'name',
      formControlName: 'region'
    }
  ]

  form: FormGroup

  constructor(
    private regionService: RegionService,
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      region: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.load()
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

  add() {
    this.form.reset()
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '550px',
      data: {
        title: 'Добавление департамента',
        fields: this.departmentFields,
        buttons: [
          {
            color: 'primary',
            disabled: () => this.form.invalid,
            action: () => {
              this.departmentService.save(this.form.value)
                .subscribe(() => this.load())
              dialogRef.close()
            },
            label: 'Сохранить'
          }, {
            action: () => dialogRef.close(),
            label: 'Закрыть'
          }
        ],
        form: this.form
      }
    })
  }

  edit(department: Department) {
    this.form.patchValue(department)
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '550px',
      data: {
        title: 'Редактирование департамента',
        fields: this.departmentFields,
        buttons: [
          {
            color: 'primary',
            disabled: () => this.form.invalid,
            action: () => {
              this.departmentService.edit(Object.assign(department, this.form.value))
                .subscribe(() => this.load())
              dialogRef.close()
            },
            label: 'Редактировать'
          },{
            action: () => dialogRef.close(),
            label: 'Закрыть'
          }
        ],
        form: this.form
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
