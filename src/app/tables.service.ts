import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ServerService } from "./server.service";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class TablesService {
  bookDate;
  constructor(private router: Router, private server: ServerService) {}

  // get user reservations
  userResevaion() {
    return this.server.request("Get", "/books/me");
  }

  // book a table
  bookTable(book) {
    this.bookDate = new DatePipe("en").transform(book.date, "yyyy-MM-dd");
    return this.server.request("POST", "/books/", {
      reservationDate: book.date,
      startTime: book.start + ":00",
      endTime: book.end + ":00",
      membersNumber: book.members,
    });
  }

  // get all tables
  fetchTables() {
    return this.server.request("Get", "/tables/");
  }

  //to add tables "admin"
  addTable(table) {
    return this.server.request("POST", "/tables/", {
      tableNumber: table.number,
      tableAccommodation: table.accommodation,
    });
  }

  // check all restuarant reservations
  fetchResevations() {
    return this.server.request("Get", "/books/all");
  }

  // fetch availabe tables for certain date
  fetchAvailableTables(date) {
    return this.server.request("Get", `/tables/available/${date}`);
  }
}
