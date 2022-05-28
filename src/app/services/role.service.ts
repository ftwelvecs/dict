import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthHolderService} from "./auth-holder.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient,
    private authHolderService: AuthHolderService
  ) {
  }

  public getRoles(): Observable<any> {
    return this.http.get<Role[]>(`${environment.url}/role`, {headers: this.getHeaders()})
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${this.authHolderService.token}`)
  }

}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
