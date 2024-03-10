import { Component, OnInit } from '@angular/core';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';

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

  deleteHoliday(holidayId: number): void {
    this.holidaysService.deleteHoliday(holidayId)
      .subscribe(() => {
        this.getHolidays();
      });
  }
}
