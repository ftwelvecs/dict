import {Injectable} from '@angular/core';
import {User} from "../components/users/user.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthHolderService} from "./auth-holder.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // инжектируем сервис HttpClient
  constructor(
    private http: HttpClient,
    private authHolderService: AuthHolderService
  ) {
  }

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)

    return this.http.get<User[]>(`${environment.url}/user`, {headers})
  }

  save(user: User): Observable<any> {
    const savedUser: User = {
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      department: {id: user.departmentId},
      position: {id: user.positionId}
    }

    const headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
    return this.http.post(`${environment.url}/user`, savedUser, {headers})
  }

  edit(user: User): Observable<any> {
    const editedUser: User = {
      id: user.id,
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      department: {id: user.departmentId},
      position: {id: user.positionId}
    }

    const headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
    return this.http.put(`${environment.url}/user`, editedUser, {headers})
  }

  delete(user: User): Observable<any> {
    const deletedUser: User = {id: user.id}

    const headers = new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)

    return this.http.delete(`${environment.url}/user`, {
      headers: headers,
      body: deletedUser
    })
  }
}
