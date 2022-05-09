import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {DepartmentService} from "../../../services/department.service";
import {PositionService} from "../../../services/position.service";
import {Department} from "../../departments/department.interface";
import {Region} from "../../positions/position.interface";
import {User} from "../user.interface";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: any
  // черновик для редактирования
  editUser: User;
  departments: Array<Department>
  positions: Array<Region>

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private departmentService: DepartmentService,
              private positionService: PositionService) { }

  ngOnInit(): void {
    // http://localhost:4200/users/:username <- берем из адресной строки параметр username
    let username = this.route.snapshot.params['username']
    // ищем через сервис выбранного пользователя
    this.user = this.userService.findByUsername(username)
    // клонирование объекта User
    this.editUser = Object.assign({}, this.user)
    // Object.assign не клонирует внутренние объекты
    this.editUser.department = Object.assign({}, this.user.department)
    this.editUser.position = Object.assign({}, this.user.position)
    this.departments = this.departmentService.departments
    this.positions = this.positionService.positions
  }

  save() {
    this.user.username = this.editUser.username
    this.user.password = this.editUser.password
    this.user.firstName = this.editUser.firstName
    this.user.lastName = this.editUser.lastName
    this.user.email = this.editUser.email
    this.user.department = this.editUser.department
    this.user.position = this.editUser.position
  }

}
