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

  constructor(
    private http: HttpClient,
    private authHolderService: AuthHolderService
  ) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.url}/user`, {headers: this.getHeaders()})
  }

  save(user: User): Observable<any> {
    return this.http.post(`${environment.url}/user`, user, {headers: this.getHeaders()})
  }

  edit(user: User): Observable<any> {
    return this.http.put(`${environment.url}/user`, user, {headers: this.getHeaders()})
  }

  delete(user: User): Observable<any> {
    return this.http.delete(`${environment.url}/user`, {headers: this.getHeaders(), body: user})
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
  }
}
