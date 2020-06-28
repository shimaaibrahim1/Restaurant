import { Component, OnInit, OnDestroy } from "@angular/core";
import { TablesService } from "../tables.service";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-admin-home",
  templateUrl: "./admin-home.component.html",
  styleUrls: ["./admin-home.component.css"],
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  form: FormGroup;
  errors: string = "";
  tables;
  subscription;

  constructor(private fb: FormBuilder, private tablesService: TablesService) {}

  ngOnInit() {
    this.form = this.fb.group({
      number: "",
      accommodation: "",
    });
    //fetch all tables
    this.subscription = this.tablesService.fetchTables().subscribe(
      (response: any) => {
        this.tables = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    const request = this.tablesService.addTable(this.form.value);
    console.log(this.form.value);
    request.subscribe(
      () => {
        this.errors = "";
        this.tables = this.tablesService.fetchTables().subscribe(
          (response: any) => {
            this.tables = response;
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        if (err.status == 500) {
          this.errors = " Something went wrong please try again";
          console.log(err);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
