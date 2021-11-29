import {Component, Input, OnInit} from '@angular/core';
import {Service} from "../../services/service.interface";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() id: string
  @Input() title: string
  @Input() fields: Array<any>
  @Input() service: Service

  element:any = {}

  constructor() { }

  ngOnInit(): void {
  }

  save() {
    this.service.save(this.element)
  }

}
