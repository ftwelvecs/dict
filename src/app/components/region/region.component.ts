import {Component, OnInit} from '@angular/core';
import {Region} from "./region.interface";
import {RegionService} from "../../services/region.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {FormModalComponent} from "../../shared/form-modal/form-modal.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  form: FormGroup;

  dataSource = new MatTableDataSource<Region>();

  displayedColumns = ['id', 'name', 'menu']

  regionFields = [
    {
      id: 'regionName',
      label: 'Название региона',
      type: 'text',
      controlType: 'input',
      formControlName: 'name'
    }
  ]

  // внедряем RegionService
  constructor(
    private regionService: RegionService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group(
      {
        name: new FormControl(null, Validators.required)
      }
    )
  }

  ngOnInit(): void {
    this.load()
  }

  load() {
    this.regionService.getRegions()
      .subscribe(data => {
        this.dataSource.data = data
      })
  }

  add() {
    this.form.reset()
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '550px',
      //поле data передаем в модальное окно в form-modal.component.ts
      data: {
        title: 'Добавление региона',
        fields: this.regionFields,
        buttons: [
          {
            color: 'primary',
            label: 'Сохранить',
            disabled: () => this.form.invalid,  //возвращаем состояние формы - disabled пока input поле пустое
            action: () => {
              this.regionService.save(this.form.value)
                .subscribe(() => this.load())
              dialogRef.close()
            }
          }, {
            label: 'Закрыть',
            action: () => dialogRef.close()
          }
        ],
        form: this.form
      }
    })
  }

  edit(region: Region) {
    this.form.patchValue(region)
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '550px',
      data: {
        title: 'Редактирование региона',
        fields: this.regionFields,
        buttons: [
          {
            color: 'primary',
            label: 'Редактировать',
            disabled: () => this.form.invalid,
            action: () => {
              this.regionService.edit(Object.assign(region, this.form.value))
                .subscribe(() => this.load())
              dialogRef.close()
            }
          },{
            label: 'Закрыть',
            action: () => dialogRef.close()
          }
        ],
        form: this.form
      }
    })
  }

  delete(region: Region) {
    this.regionService.delete(region)
      .subscribe(() => this.load());
  }
}
