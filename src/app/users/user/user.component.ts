import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: any

  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    // http://localhost:4200/users/:username <- берем из адресной строки параметр username
    let username = this.route.snapshot.params['username']
    // ищем через сервис выбранного пользователя
    this.user = this.userService.findByUsername(username)
  }

}
