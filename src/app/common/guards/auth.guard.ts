import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const now = new Date();
      const tokenExpiredDate = new Date(decodedToken.exp * 1000);

      const result = now < tokenExpiredDate;
      if (!result) {
        this.router.navigate(['/login']);
      }
      return result;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
