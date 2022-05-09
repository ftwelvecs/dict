import {Component, OnInit} from '@angular/core';
import {Region} from "./region.interface";
import {RegionService} from "../../services/region.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../shared/modal/modal.component";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

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
    controlType: 'input'
  }]

  // внедряем RegionService
  constructor(public regionService: RegionService, public dialog: MatDialog) { }

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
      data: {
        title: 'Добавление должности',
        fields: this.regionFields,
        buttons: [{
          color: 'primary',
          label: 'Сохранить',
          action: (element: any) => {
            this.regionService.save(element)
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

  edit(region: Region) {

  }

  delete(region: Region) {
    this.regionService.delete(region)
      .subscribe(() => this.load());
  }
}
