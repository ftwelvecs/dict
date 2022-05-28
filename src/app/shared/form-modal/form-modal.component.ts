import {Component, Inject, OnInit} from '@angular/core';
import {Service} from "../../services/service.interface";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
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
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {

  title: string
  description?: string
  fields?: Array<any>
  buttons: Array<any>
  service: Service
  element: any
  form: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {
    this.title = data.title
    this.description = data.description
    this.fields = data.fields
    this.buttons = data.buttons
    this.element = data.element || {}
    this.form = data.form || new FormGroup({}) //передали форму в конструктор
  }

  ngOnInit(): void {
  }

  compare(opt1: any, opt2: any): boolean {
    return opt1?.id && opt2?.id ? opt1.id === opt2.id : opt1 === opt2;
  }

}
