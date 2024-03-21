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
  currentPage: number = 1;
  itemsPerPage: number = 6;
 
  totalItems: number = 0;
  constructor(private holidaysService:EmplyeeServiceService) { }
  ngOnInit(): void {
    this.getHolidays();
  }
  getHolidays(): void {
    this.holidaysService.getHolidays()
      .subscribe(holidays => {
        this.holidays = holidays;
        this.totalItems = holidays.length;
        this.holidays  = this.holidays .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
      });
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
  onPageChange(page: number): void {
    this.currentPage = page;
    this.getHolidays();
  }
  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  getDisplayedHolidays(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    return this.holidays.slice(startIndex, endIndex);
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
