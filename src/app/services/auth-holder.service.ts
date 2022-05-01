import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthHolderService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  public login(authRequest: AuthRequest) {
    this.http.post(`${environment.url}/auth/login`, authRequest)
      .subscribe((response:any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home'])
      });
  }

  get token(): string {
    return localStorage.getItem('token') as string;
  }
}

export interface AuthRequest {
  username: string;
  password: string;
}
