import {
  Component, ContentChild,
  ElementRef,
  EventEmitter,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import {Department} from "./department.interface";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  @ViewChild('departmentNameInput') departmentNameInput:ElementRef
  @ContentChild('divElement') divElement:ElementRef
  @Output() onDepartmentAdded: EventEmitter<Department> = new EventEmitter<Department>()

  ngOnInit(): void {
  }

  add() {
    const department: Department = {
      name: this.departmentNameInput.nativeElement.value
    }
    this.onDepartmentAdded.emit(department)
  }

}
