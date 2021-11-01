import { Injectable } from '@angular/core';
import {User} from "../users/user.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Array<User> = []

  constructor() {
  }

  add(user: User) {
    this.users.push(user)
  }

}
