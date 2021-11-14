import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Department} from "../departments/department.interface";
import {UserService} from "../services/user.service";
import {DepartmentService} from "../services/department.service";
import {User} from "./user.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {Position} from "../positions/position.interface";
import {PositionService} from "../services/position.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private _departments: Array<Department> = []
  positions: Array<Position> = []
  users: Array<User> = []

  // декоратор позволяет получить через local reference доступ к элементу DOM
  @ViewChild('userNameInput') private userNameInput: ElementRef
  @ViewChild('passwordInput') private passwordInput: ElementRef
  @ViewChild('firstNameInput') private firstNameInput: ElementRef
  @ViewChild('lastNameInput') private lastNameInput: ElementRef
  @ViewChild('emailInput') private emailInput: ElementRef
  @ViewChild('departmentSelect') private departmentSelect: ElementRef
  @ViewChild('positionSelect') private positionSelect: ElementRef

  constructor(private departmentService: DepartmentService,
              private userService: UserService,
              private positionService: PositionService,
              // Router позволяет переходить по страницам
              private router: Router,
              // внедряем ActivatedRoute чтобы знать текущий URL путь
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._departments = this.departmentService.departments
    this.users = this.userService.users
    this.positions = this.positionService.positions
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
      department: department,
      position: {
        name: this.positionSelect.nativeElement.value
      }
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

  filter(username: string,
         firstName: string,
         lastName: string,
         email: string,
         departmentName: string,
         regionName: string,
         positionName: string) {
    // console.log(`username: ${username}, firstName: ${firstName}, lastName: ${lastName}, email: ${email}, departmentName: ${departmentName}, regionName: ${regionName}`)

    this.users = this.userService.users.filter(user =>
      (!username || user.username.toLowerCase().startsWith(username.toLowerCase())) &&
      (!firstName || user.firstName.toLowerCase().startsWith(firstName.toLowerCase())) &&
      (!lastName || user.lastName.toLowerCase().startsWith(lastName.toLowerCase())) &&
      (!email || user.email.toLowerCase().startsWith(email.toLowerCase())) &&
      (!departmentName || user.department.name.toLowerCase().startsWith(departmentName.toLowerCase())) &&
      (!regionName || user.department.region.name.toLowerCase().startsWith(regionName.toLowerCase())) &&
      (!positionName || user.position.name.toLowerCase().startsWith(positionName.toLowerCase()))
    )

  }

}
