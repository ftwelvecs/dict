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

  constructor(private positionService: PositionService) { }

  ngOnInit(): void {
    this.positions = this.positionService.positions
  }

  add(positionName: string) {
    const position: Position = { name: positionName }
    this.positionService.add(position)
  }
}
