import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DepartmentService} from "../../../services/department.service";
import {User} from "../../users/user.interface";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  department: any
  users: Array<User> = []

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    const departmentName = this.route.snapshot.params['name']
    this.departmentService.getDepartments()
      .subscribe(departments => {
        this.department = departments.find(department => department.name == departmentName)
      })
    // здесь мы фильтруем юзеров, которые входят в departmentName
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users.filter(user => user.department?.name === this.department.name)
      })
  }

}
