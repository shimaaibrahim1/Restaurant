import { Component, OnInit,OnDestroy  } from '@angular/core';
import { TablesService } from '../tables.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit, OnDestroy  {

  subscription;
  myReservation;
  form: FormGroup;
  errors: string = "";
  recentReservation;
  today = new Date();
  payload;

  constructor(
    private fb: FormBuilder,
    private tablesService: TablesService
    ) { }
  
  ngOnInit() {
    this.myReservation =[];
    this.recentReservation = [];
    this.form = this.fb.group({
      date: '',
      start: '',
      end: '',
      members: ''
    },);

    this.subscribe()
   
  }
  
  onSubmit() {
    // submit reservation form
    this.payload = this.form.value;
    if(this.today> this.payload.date || this.payload.start > this.payload.end ){
      this.errors = "You may enter invalid data, please try again";
      console.log(this.payload)
    }else{
    //reserve table
    const request = this.tablesService.bookTable(this.form.value);
    request.subscribe(() => {
      this.errors = '';
      //get reserved tables
      this.subscribe()
    },
    (err)=>{
      if(err.status == 400){
        this.errors = "You may enter invalid data, please try again" ;
      }else if(err.status == 500){
        if(this.payload.members == ''){
          this.errors = "please inter the number of members";
        }else{
        this.errors = "There is no availabe tables try again later!" ;
        }
      }
      
      })
    }
    

  }

    //get user all reservation and filter based on date
    subscribe(){
    this.subscription = this.tablesService.userResevaion().subscribe((response: any) => {
                          response.forEach(book => {
                            try{
                              if(this.today < new Date(book.reservationDate))
                              {
                                this.recentReservation.push(book)
                              }else{
                                this.myReservation.push(book)
                              }
                            }catch(err){}});
                        },
                        (err) => {console.log(err)});
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
