import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute,
              private departmentService: DepartmentService,
              private userService: UserService) { }

  ngOnInit(): void {
    const departmentName = this.route.snapshot.params['name']
    this.department = this.departmentService.findByName(departmentName)
    // здесь мы фильтруем юзеров, которые входят в departmentName
    this.users = this.userService.users.filter(user => user.department.name === this.department.name)
  }

}
