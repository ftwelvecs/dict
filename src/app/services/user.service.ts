import { Injectable } from '@angular/core';
import {User} from "../users/user.interface";

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

  findByUsername(username: string) {
    return this.users.find(user => user.username == username)
  }
}
