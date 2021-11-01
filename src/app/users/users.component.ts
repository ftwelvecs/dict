import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Department} from "../department/department.interface";
import {UserService} from "../services/user.service";
import {DepartmentService} from "../services/department.service";
import {User} from "./user.interface";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private _departments: Array<Department> = []
  // декоратор позволяет получить через local reference доступ к элементу DOM
  @ViewChild('userNameInput') private userNameInput: ElementRef
  @ViewChild('passwordInput') private passwordInput: ElementRef
  @ViewChild('firstNameInput') private firstNameInput: ElementRef
  @ViewChild('lastNameInput') private lastNameInput: ElementRef
  @ViewChild('emailInput') private emailInput: ElementRef
  @ViewChild('departmentSelect') private departmentSelect: ElementRef

  constructor(private departmentService: DepartmentService,
              private userService: UserService) { }

  ngOnInit(): void {
    this._departments = this.departmentService.departments
  }

  get departments(): Array<Department> {
    return this._departments;
  }

  add() {
    // в переменной храним имя департамента, получаемой из local reference
    let departmentName = this.departmentSelect.nativeElement.value
    // в сервисе по имени департамента ищем сам объект департамент
    const department: any = this.departmentService.findByName(departmentName)
    const user: User = {
      username: this.userNameInput.nativeElement.value,
      password: this.passwordInput.nativeElement.value,
      firstName: this.firstNameInput.nativeElement.value,
      lastName: this.lastNameInput.nativeElement.value,
      email: this.emailInput.nativeElement.value,
      // устанавливаем значение объектом Department
      department: department
    }
    this.userService.add(user)
  }

}
