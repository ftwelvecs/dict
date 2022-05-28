import {Component, OnInit} from '@angular/core';
import {Department} from "../departments/department.interface";
import {UserService} from "../../services/user.service";
import {DepartmentService} from "../../services/department.service";
import {User} from "./user.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {Position} from "../positions/position.interface";
import {PositionService} from "../../services/position.service";
import {MatTableDataSource} from "@angular/material/table";
import {FormModalComponent} from "../../shared/form-modal/form-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {checkPassword} from "../../shared/validators";
import {Role, RoleService} from "../../services/role.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  departments: Array<Department> = []
  positions: Array<Position> = []
  roles: Array<Role> = []

  dataSource = new MatTableDataSource<User>();

  displayedColumns = ['id', 'username', 'firstName', 'lastName', 'email', 'department', 'position', 'menu']

  userFields = [
    {
      id: 'username',
      label: 'Логин',
      type: 'text',
      controlType: 'input',
      formControlName: 'username'
    }, {
      id: 'password',
      label: 'Пароль',
      type: 'password',
      controlType: 'input',
      formControlName: 'password'
    }, {
      id: 'firstName',
      label: 'Имя',
      type: 'text',
      controlType: 'input',
      formControlName: 'firstName'
    }, {
      id: 'lastName',
      label: 'Фамилия',
      type: 'text',
      controlType: 'input',
      formControlName: 'lastName'
    }, {
      id: 'email',
      label: 'Почта',
      type: 'text',
      controlType: 'input',
      formControlName: 'email'
    }, {
      id: 'department',
      label: 'Департамент',
      controlType: 'select',
      options: this.departments,
      displayValue: 'name',
      formControlName: 'department'
    }, {
      id: 'position',
      label: 'Должность',
      controlType: 'select',
      options: this.positions,
      displayValue: 'name',
      formControlName: 'position'
    }, {
      id: 'role',
      label: 'Роль',
      controlType: 'select',
      options: this.roles,
      dataType: 'enum',
      formControlName: 'role'
    }
  ]

  form: FormGroup

  constructor(
    private departmentService: DepartmentService,
    private userService: UserService,
    private positionService: PositionService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, checkPassword]),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      department: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required)
    })
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
    this.roleService.getRoles()
      .subscribe(data => {
        this.roles.length = 0
        this.roles.push(...data)
      })
  }

  load() {
    this.userService.getUsers()
      .subscribe(data => this.dataSource.data = data)
  }

  add() {
    this.form.reset()
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '550px',
      data: {
        title: 'Добавление пользователя',
        fields: this.userFields,
        buttons: [
          {
            color: 'primary',
            disabled: () => this.form.invalid,
            action: () => {
              this.userService.save(this.form.value)
                .subscribe(() => this.load())
              dialogRef.close()
            },
            label: 'Сохранить'
          }, {
            action: () => dialogRef.close(),
            label: 'Закрыть'
          }
        ],
        form: this.form
      }
    })
  }

  edit(user: User) {
    this.form.patchValue(user)
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '550px',
      data: {
        title: 'Редактирование пользователя',
        fields: this.userFields.filter(field => field.id !== 'password'),
        buttons: [
          {
            color: 'primary',
            disabled: () => this.form.invalid,
            action: () => {
              this.userService.edit(Object.assign(user, this.form.value))
                .subscribe(() => this.load())
              dialogRef.close()
            },
            label: 'Сохранить'
          }, {
            action: () => dialogRef.close(),
            label: 'Закрыть'
          }
        ],
        form: this.form
      }
    })
  }

  delete(user: User) {
    this.userService.delete(user)
      .subscribe(() => this.load())
  }

  // вызывается при двойном клике по пользователю
  navigate(user: User) {
    // если хотим переход относительно текущего пути, то передаем второй параметр
    this.router.navigate([user.username], {relativeTo: this.route})

    // а если абсолютный путь, то указываем весь путь начиная с корня
    // this.router.navigate(['users', user.username])
  }
}
