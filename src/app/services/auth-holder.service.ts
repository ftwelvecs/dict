import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthHolderService {

  private token: string;

  constructor(private http: HttpClient) {
  }

  public login(authRequest: AuthRequest) {
    this.http.post(`${environment.url}/auth/login`, authRequest)
      .subscribe((response:any) => {
        this.token = response.token;
        localStorage.setItem('token', this.token);
      });
  }
}

export interface AuthRequest {
  username: string;
  password: string;
}
