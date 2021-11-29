import { Component, OnInit } from '@angular/core';
import {Position} from "./position.interface";
import {PositionService} from "../services/position.service";

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  positions: Array<Position> = []

  modalId = 'positionModal'
  modalTitle = 'Добавление должности'
  // массив описывающий поля для ввода
  positionFields = [{
    id: 'positionName',
    label: 'Должность',
    // значение соответствует поле объекта, который будет сохранен
    // например при post запросе значение будет использоваться как ключ
    // post -> { name: 'Какое-то значение' }
    name: 'name',
    type: 'text'
  }]

  constructor(public positionService: PositionService) { }

  ngOnInit(): void {
    this.positions = this.positionService.positions
  }

  add(positionName: string) {
    const position: Position = { name: positionName }
    this.positionService.add(position)
  }
}
