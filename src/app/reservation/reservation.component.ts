import { Component, OnInit } from "@angular/core";
import { TablesService } from "../tables.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-reservation",
  templateUrl: "./reservation.component.html",
  styleUrls: ["./reservation.component.css"],
})
export class ReservationComponent implements OnInit {
  subscription;
  books;
  all_books;
  search_date: string = "";
  search;

  submit() {
    this.search = this.datePipe.transform(this.search_date, "yyyy-MM-dd");
    this.books = this.all_books.filter((book) => {
      if (
        this.datePipe.transform(book.reservationDate, "yyyy-MM-dd") ==
        this.search
      )
        return book;
    });
  }

  constructor(
    private tablesService: TablesService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.subscription = this.tablesService.fetchResevations().subscribe(
      (response: any) => {
        this.all_books = response;
        this.books = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
