import { Component, OnInit } from "@angular/core";
import { TablesService } from "../tables.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-available-tables",
  templateUrl: "./available-tables.component.html",
  styleUrls: ["./available-tables.component.css"],
})
export class AvailableTablesComponent implements OnInit {
  subscription;
  search;
  search_date: string = "";
  tables = [];
  date = new Date();
  today = this.datePipe.transform(this.date, "yyyy-MM-dd");

  submit() {
    // tarnsform date to be able to send to server
    this.search = this.datePipe.transform(this.search_date, "yyyy-MM-dd");
    this.subscription = this.tablesService
      .fetchAvailableTables(this.search)
      .subscribe(
        (response: any) => {
          this.tables = response;
          console.log(this.search);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  constructor(
    private tablesService: TablesService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    // get available tables for today 
    this.subscription = this.tablesService
      .fetchAvailableTables(this.today)
      .subscribe(
        (response: any) => {
          this.tables = response;
          console.log(this.today);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
