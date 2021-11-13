import { Injectable } from '@angular/core';
import {User} from "../users/user.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Array<User> = []

  constructor(private http: HttpClient) {
    this.http.get("./assets/users.json")
      .subscribe(data => {
        // три точки распаковывают элементы массива
        // далее они упаковываются в массив users
        this.users.push(...<Array<User>> data)
      })
  }

  add(user: User) {
    this.users.push(user)
  }

  findByUsername(username: string) {
    return this.users.find(user => user.username == username)
  }
}
