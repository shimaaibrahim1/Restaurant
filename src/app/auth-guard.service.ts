import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    const tokenRole = this.auth.isAdmin;

    // check if user is logged and check the role
    if (!this.auth.isLoggedIn) {
      this.router.navigate(["sign-in"]);
      return false;
    } else if (this.auth.isLoggedIn && tokenRole !== expectedRole) {
      this.router.navigate(["home"]);
      return false;
    }

    return true;
  }
}
