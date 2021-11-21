import { Injectable } from '@angular/core';
import {User} from "../users/user.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Array<User> = []

  // инжектируем сервис HttpClient
  constructor(private http: HttpClient) {
    this.http.get(`${environment.url}/user/getAll`)
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

  delete(user: User) {
    let newUsers = this.users.filter(u => u.username != user.username)
    this.users.length = 0
    this.users.push(...newUsers)
  }
}
