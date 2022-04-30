import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthHolderService {

  private token: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  public login(authRequest: AuthRequest) {
    this.http.post(`${environment.url}/auth/login`, authRequest)
      .subscribe((response:any) => {
        this.token = response.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['/home'])
      });
  }
}

export interface AuthRequest {
  username: string;
  password: string;
}
