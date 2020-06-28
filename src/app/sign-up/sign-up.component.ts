import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ServerService } from "../server.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  errors: [];

  constructor(
    private fb: FormBuilder,
    private server: ServerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: "",
      email: "",
      password: "",
      phone: "",
    });
  }

  onSubmit() {
    // send sign up form
    const request = this.server.request("POST", "/auth/sign-up", {
      name: this.form.get("name").value,
      email: this.form.get("email").value,
      password: this.form.get("password").value,
      mobileNumber: this.form.get("phone").value,
    });
    request.subscribe(
      () => {
        this.router.navigate(["/sign-in"]);
      },
      (err) => {
        this.errors = err.error.errors.map((e) => {
          return e.defaultMessage;
        });
      }
    );
  }
}
