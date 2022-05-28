import {Component, OnInit} from '@angular/core';
import {PositionService} from "../../services/position.service";
import {MatDialog} from "@angular/material/dialog";
import {FormModalComponent} from "../../shared/form-modal/form-modal.component";
import {MatTableDataSource} from "@angular/material/table";
import {Position} from "./position.interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  dataSource = new MatTableDataSource<Position>();

  displayedColumns = ['id', 'name', 'menu']

  positionFields = [
    {
      id: 'positionName',
      label: 'Должность',
      type: 'text',
      controlType: 'input',
      formControlName: 'name'
    }
  ]

  form: FormGroup

  constructor(
    private positionService: PositionService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.load()
  }

  load() {
    this.positionService.getPositions()
      .subscribe(data => {
        this.dataSource.data = data
      })
  }

  add() {
    this.form.reset()
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '550px',
      data: {
        title: 'Добавление должности',
        fields: this.positionFields,
        buttons: [
          {
            color: 'primary',
            label: 'Сохранить',
            disabled: () => this.form.invalid,
            action: () => {
              this.positionService.save(this.form.value)
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

  edit(position: Position) {
    this.form.patchValue(position)
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '550px',
      data: {
        title: 'Редактирование должности',
        fields: this.positionFields,
        buttons: [{
          color: 'primary',
          label: 'Редактировать',
          disabled: () => this.form.invalid,
          action: () => {
            this.positionService.edit(Object.assign(position, this.form.value))
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

  delete(position: Position) {
    this.positionService.delete(position)
      .subscribe(() => this.load())
  }
}
