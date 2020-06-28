import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: "",
      password: "",
    });
  }

  resetForm() {
    this.form.reset();
  }

  async onSubmit() {
    // send login form
    this.loginInvalid = false;
    try {
      await this.authService.login(this.form.value);
    } catch (err) {
      this.loginInvalid = true;
      this.resetForm();
    }
  }
}
