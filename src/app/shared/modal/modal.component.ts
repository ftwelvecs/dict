import {Component, Inject, OnInit} from '@angular/core';
import {Service} from "../../services/service.interface";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";

export interface DialogData {
  title: string,
  description?: string,
  fields?: Array<any>,
  service: Service,
  buttons: Array<any>,
  element?: any,
  form?: FormGroup
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  title: string
  description?: string
  fields?: Array<any>
  buttons: Array<any>
  service: Service
  element: any
  form: FormGroup

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.title = data.title
    this.description = data.description
    this.fields = data.fields
    this.buttons = data.buttons
    this.element = data.element || {}
    this.form = data.form || new FormGroup({}) //передали форму в конструктор
  }

  ngOnInit(): void {
  }

}
