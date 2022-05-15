import {Component, OnInit} from '@angular/core';
import {Department} from "../departments/department.interface";
import {UserService} from "../../services/user.service";
import {DepartmentService} from "../../services/department.service";
import {User} from "./user.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {Position} from "../positions/position.interface";
import {PositionService} from "../../services/position.service";
import {MatTableDataSource} from "@angular/material/table";
import {ModalComponent} from "../../shared/modal/modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  departments: Array<Department> = []
  positions: Array<Position> = []

  dataSource = new MatTableDataSource<User>();

  displayedColumns = ['id', 'username', 'firstName', 'lastName',  'email', 'department', 'position', 'menu']

  userFields = [{
    id: 'username',
    label: 'Логин',
    // значение соответствует поле объекта, который будет сохранен
    // например при post запросе значение будет использоваться как ключ
    // post -> { name: 'Какое-то значение' }
    name: 'username',
    type: 'text',
    controlType: 'input'
  }, {
    id: 'password',
    label: 'Пароль',
    // значение соответствует поле объекта, который будет сохранен
    // например при post запросе значение будет использоваться как ключ
    // post -> { name: 'Какое-то значение' }
    name: 'password',
    type: 'password',
    controlType: 'input'
  }, {
    id: 'firstName',
    label: 'Имя',
    name: 'firstName',
    type: 'text',
    controlType: 'input'
  }, {
    id: 'lastName',
    label: 'Фамилия',
    name: 'lastName',
    type: 'text',
    controlType: 'input'
  }, {
    id: 'email',
    label: 'Почта',
    name: 'email',
    type: 'text',
    controlType: 'input'
  }, {
    id: 'department',
    label: 'Департамент',
    controlType: 'select',
    options: this.departments,
    displayValue: 'name',
    setValue: 'id',
    name: 'departmentId'
  }, {
    id: 'position',
    label: 'Должность',
    controlType: 'select',
    options: this.positions,
    displayValue: 'name',
    setValue: 'id',
    name: 'positionId'
  }]

  constructor(
    private departmentService: DepartmentService,
    private userService: UserService,
    private positionService: PositionService,
    // Router позволяет переходить по страницам
    private router: Router,
    // внедряем ActivatedRoute чтобы знать текущий URL путь
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.load()
    this.departmentService.getDepartments()
      .subscribe(data => {
        this.departments.length = 0
        this.departments.push(...data)
      })
    this.positionService.getPositions()
      .subscribe(data => {
        this.positions.length = 0
        this.positions.push(...data)
      })
  }

  load() {
    this.userService.getUsers()
      .subscribe(data => this.dataSource.data = data)
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
      data: {
        title: 'Добавление пользователя',
        fields: this.userFields,
        buttons: [{
          color: 'primary',
          action: (element: any) => {
            this.userService.save(element)
              .subscribe(() => this.load())
            dialogRef.close()
          },
          label: 'Сохранить'
        }, {
          action: () => dialogRef.close(),
          label: 'Закрыть'
        }]
      }
    })
  }

  // вызывается при двойном клике по пользователю
  navigate(user: User) {
    // если хотим переход относительно текущего пути, то передаем второй параметр
    this.router.navigate([user.username], {relativeTo: this.route})

    // а если абсолютный путь, то указываем весь путь начиная с корня
    // this.router.navigate(['users', user.username])
  }

  delete(user: User) {
    this.userService.delete(user)
      .subscribe(() => this.load())
  }

  edit(user: User) {

  }

}
