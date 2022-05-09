import {Injectable} from '@angular/core';
import {User} from "../components/users/user.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthHolderService} from "./auth-holder.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Array<User> = []

  // инжектируем сервис HttpClient
  constructor(private http: HttpClient, private authHolderService: AuthHolderService) {
    // добавляем заголовок authorization при каждом вызове в бэк
    const token = this.authHolderService.token;
    const headers = new HttpHeaders({Authorization: "Bearer " + token});
    this.http.get(`${environment.url}/user`,  {headers})
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
