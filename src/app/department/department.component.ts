import {
  Component, ContentChild,
  ElementRef,
  EventEmitter,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import {Department} from "./department.interface";
import {RegionService} from "../services/region.service";
import {Region} from "../region/region.interface";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  @ViewChild('departmentNameInput') departmentNameInput:ElementRef
  @ViewChild('regionSelect') regionSelect: ElementRef
  @ContentChild('divElement') divElement:ElementRef
  @Output() onDepartmentAdded: EventEmitter<Department> = new EventEmitter<Department>()

  regions: Array<Region> = []

  constructor(private regionService: RegionService) {
  }

  ngOnInit(): void {
    // связали массив в RegionService со своим внутренним массивом
    this.regions = this.regionService.regions
  }

  add() {
    const department: Department = {
      name: this.departmentNameInput.nativeElement.value,
      regionName: this.regionSelect.nativeElement.value
    }
    this.onDepartmentAdded.emit(department)
  }

}
