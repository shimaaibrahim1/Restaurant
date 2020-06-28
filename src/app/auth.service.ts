import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { ServerService } from "./server.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private helper = new JwtHelperService();
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;
  private invaildTry: boolean = false;
  private decodedToken;
  private role = "NO";

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isAdmin() {
    return this.role;
  }

  get isInvaildTry() {
    return this.invaildTry;
  }

  constructor(private router: Router, private server: ServerService) {
    // check if token exists in local storage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      this.token = user.token;
      this.decodedToken = this.helper.decodeToken(this.token);
      this.role = this.decodedToken.admin[0].authority;
      this.server.setLoggedIn(true, this.token);
      this.loggedIn.next(true);
    }
  }

  login(user) {
    return this.server
      .request("POST", "/auth", {
        username: user.email,
        password: user.password,
      })
      .subscribe(
        (response: any) => {
          if (response.token !== undefined) {
            this.token = response.token;
            this.server.setLoggedIn(true, this.token);
            this.loggedIn.next(true);
            const userData = {
              token: this.token,
            };
            // save token in local storage and redirct to home page
            localStorage.setItem("user", JSON.stringify(userData));
            this.decodedToken = this.helper.decodeToken(this.token);
            this.role = this.decodedToken.admin[0].authority;
            this.invaildTry = false;
            this.router.navigateByUrl("/home");
          }
        },
        (err) => {
          this.invaildTry = true;
        }
      );
  }

  logout() {
    this.server.setLoggedIn(false);
    delete this.token;
    this.role = "NO";
    this.loggedIn.next(false);
    // delete token
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}
