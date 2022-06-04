import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Position} from "../positions/position.interface";
import {MaterialValues} from "./material-values.interface";
import {MaterialValuesService} from "../../services/material-values.service";

@Component({
  selector: 'app-material-values',
  templateUrl: './material-values.component.html',
  styleUrls: ['./material-values.component.css']
})
export class MaterialValuesComponent implements OnInit {

  dataSource = new MatTableDataSource<MaterialValues>();

  displayedColumns = ['id', 'name', 'inventNumber', 'price', 'materialType', 'yearOfPurchase', 'usedBy']


  constructor(private materialValuesService: MaterialValuesService) {

  }

  ngOnInit(): void {
    this.materialValuesService.getMaterialValues().subscribe(data => this.dataSource.data = data)
  }

  add() {

  }


}
