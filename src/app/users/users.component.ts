import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Department} from "../departments/department.interface";
import {UserService} from "../services/user.service";
import {DepartmentService} from "../services/department.service";
import {User} from "./user.interface";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private _departments: Array<Department> = []
  users: Array<User> = []

  // декоратор позволяет получить через local reference доступ к элементу DOM
  @ViewChild('userNameInput') private userNameInput: ElementRef
  @ViewChild('passwordInput') private passwordInput: ElementRef
  @ViewChild('firstNameInput') private firstNameInput: ElementRef
  @ViewChild('lastNameInput') private lastNameInput: ElementRef
  @ViewChild('emailInput') private emailInput: ElementRef
  @ViewChild('departmentSelect') private departmentSelect: ElementRef

  constructor(private departmentService: DepartmentService,
              private userService: UserService,
              // Router позволяет переходить по страницам
              private router: Router,
              // внедряем ActivatedRoute чтобы знать текущий URL путь
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._departments = this.departmentService.departments
    this.users = this.userService.users
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

  // вызывается при двойном клике по пользователю
  navigate(user: User) {
    // если хотим переход относительно текущего пути, то передаем второй параметр
    this.router.navigate([user.username], {relativeTo: this.route})

    // а если абсолютный путь, то указываем весь путь начиная с корня
    // this.router.navigate(['users', user.username])
  }

}
