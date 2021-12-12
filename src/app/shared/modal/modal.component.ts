import {Component, Inject, Input, OnInit} from '@angular/core';
import {Service} from "../../services/service.interface";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  title: string,
  fields: Array<any>,
  service: Service,
  buttons: Array<any>,
  element?: any
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  title: string
  fields: Array<any>
  buttons: Array<any>
  service: Service
  element: any

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.title = data.title
    this.fields = data.fields
    this.buttons = data.buttons
    this.service = data.service
    this.element = data.element || {}
  }

  ngOnInit(): void {
  }

}
