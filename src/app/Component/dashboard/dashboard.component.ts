import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {
  
  showEmployeeActions: boolean = false;
  showEmployeeAttendanceActions: boolean = false;
  showHolidayActions: boolean = false;
  showReportsActions: boolean = false;
  showGeneralHolidayActions: boolean = false;
  constructor() { }

  ngOnInit(): void {
  
  }
  toggleEmployeeActions() {
    this.showEmployeeActions = !this.showEmployeeActions;
   
  }

  toggleEmployeeAttendanceActions() {
    this.showEmployeeAttendanceActions = !this.showEmployeeAttendanceActions;
    
  }

  toggleHolidayActions() {
    this.showHolidayActions = !this.showHolidayActions;
  }

  toggleReportsActions() {
    this.showReportsActions = !this.showReportsActions;

  }
  toggleGeneralHolidayActions() {
    this.showGeneralHolidayActions = !this.showGeneralHolidayActions;
   
  }

  editEmployee() {
    // Logic for editing an employee
    console.log('Edit employee clicked');
  }

  updateEmployee() {
    // Logic for updating an employee
    console.log('Update employee clicked');
  }

  deleteEmployee() {
    // Logic for deleting an employee
    console.log('Delete employee clicked');
  }
  
}
