import {Component, OnInit} from '@angular/core';
import {Region} from "./region.interface";
import {RegionService} from "../../services/region.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../shared/modal/modal.component";
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

  regionFields = [{
    id: 'regionName',
    label: 'Название региона',
    // значение соответствует поле объекта, который будет сохранен
    // например при post запросе значение будет использоваться как ключ
    // post -> { name: 'Какое-то значение' }
    name: 'name',
    type: 'text',
    controlType: 'input',
    formControlName: 'regionName'
  }]

  // внедряем RegionService
  constructor(
    public regionService: RegionService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group(
      {
        regionName: new FormControl(null, Validators.required)
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
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
      //поле data передаем в модальное окно в modal.component.ts
      data: {
        title: 'Добавление региона',
        fields: this.regionFields,
        buttons: [{
          color: 'primary',
          label: 'Сохранить',
          disabled: () => this.form.invalid,  //возвращаем состояние формы - disabled пока input поле пустое
          action: (element: any) => {
            this.regionService.save(element)
              .subscribe(() => this.load())
            dialogRef.close()
          }
        }, {
          label: 'Закрыть',
          action: () => dialogRef.close()
        }],
        form: this.form
      }
    })
  }

  edit(region: Region) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
      data: {
        title: 'Редактирование региона',
        fields: this.regionFields,
        element: {
          id: region.id,
          name: region.name
        },
        buttons: [{
          color: 'primary',
          label: 'Редактировать',
          action: (element: any) => {
            this.regionService.edit(element)
              .subscribe(() => this.load())
            dialogRef.close()
          }
        }, {
          label: 'Закрыть',
          action: () => dialogRef.close()
        }]
      }
    })
  }

  delete(region: Region) {
    this.regionService.delete(region)
      .subscribe(() => this.load());
  }
}
