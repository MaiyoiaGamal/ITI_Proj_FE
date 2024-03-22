import { Component, OnInit } from '@angular/core';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {
  holidays:any[]=[]
  newHoliday: any = { name: '', date: '' };
  constructor(private holidaysService:EmplyeeServiceService) { }
  ngOnInit(): void {
    this.getHolidays();
  }
  getHolidays(): void {
    this.holidaysService.getHolidays()
      .subscribe(holidays => this.holidays = holidays);
  }
  addHoliday(): void {
    if (this.newHoliday.name && this.newHoliday.date) {
      this.holidaysService.addHoliday(this.newHoliday)
        .subscribe(newHoliday => {
          this.holidays.push(newHoliday);
          this.newHoliday = { name: '', date: '' }; 
        });
    }
  }
  holidaydata:any;
  

  deleteHoliday(holidayId: number): void {
    this.holidaysService.deleteHoliday(holidayId)
      .subscribe(() => {
        this.getHolidays();
      });
  }

  deletedeleteHoliday2(HolidaysId: number, obj: any): void {
    console.log(this.holidays);
    obj = this.holidays.find((holiday: any) => holiday.id === HolidaysId);
    console.log(obj);
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.holidaysService.deleteHoliday(HolidaysId)
      .subscribe(() => {
          Swal.fire('Success', 'Employee deleted successfully', 'success');
          this.holidaysService.getHolidays().subscribe(p => this.holidays = p);
        }, (error) => {
          console.log(error);
        });
      }
    });
  }
  
}
