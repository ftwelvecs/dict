import {Component, OnInit} from '@angular/core';
import {PositionService} from "../../services/position.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../shared/modal/modal.component";
import {MatTableDataSource} from "@angular/material/table";
import {Position} from "./position.interface";

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  dataSource = new MatTableDataSource<Position>();

  displayedColumns = ['id', 'name', 'menu']

  // массив описывающий поля для ввода
  positionFields = [{
    id: 'positionName',
    label: 'Должность',
    // значение соответствует поле объекта, который будет сохранен
    // например при post запросе значение будет использоваться как ключ
    // post -> { name: 'Какое-то значение' }
    name: 'name',
    type: 'text',
    controlType: 'input'
  }]

  constructor(
    public positionService: PositionService,
    public dialog: MatDialog
  ) {
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

  edit(position: Position) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
      data: {
        title: 'Редактирование должности',
        fields: this.positionFields,
        element: {
          id: position.id,
          name: position.name
        },
        buttons: [{
          color: 'primary',
          label: 'Редактировать',
          action: (element: any) => {
            this.positionService.edit(element)
              .subscribe(() => this.load())
            dialogRef.close()
          }
        },{
          label: 'Закрыть',
          action: () => dialogRef.close()
        }]
      }
    })
  }

  delete(position: Position) {
    this.positionService.delete(position)
      .subscribe(() => this.load())
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
      data: {
        title: 'Добавление должности',
        fields: this.positionFields,
        buttons: [{
          color: 'primary',
          label: 'Сохранить',
          action: (element: any) => {
            this.positionService.save(element)
              .subscribe(() => this.load())
            dialogRef.close()
          }
        },{
          label: 'Закрыть',
          action: () => dialogRef.close()
        }]
      }
    })
  }
}