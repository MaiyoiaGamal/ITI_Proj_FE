import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDeatilesComponent } from './Component/employee-deatiles/employee-deatiles.component';
import { EmployeeComponent } from './Component/employee/employee.component';
import { ADDnewEmpComponent } from './Component/addnew-emp/addnew-emp.component';
import { EditEmployeeComponent } from './Component/edit-employee/edit-employee.component';
import { EmployeeAttendanceComponent } from './Component/employee-attendance/employee-attendance.component';
import { AddemployeeattendanceComponent } from './Component/addemployeeattendance/addemployeeattendance.component';
import { EditAttendanceComponent } from './Component/edit-attendance/edit-attendance.component';
import { HolidayComponent } from './Component/holiday/holiday.component';
import { EditholidayComponent } from './Component/editholiday/editholiday.component';
import { HomeComponent } from './Component/home/home.component';
import { EmployeesReportsComponent } from './Component/employees-reports/employees-reports.component';

const routes: Routes = [
  {path:'', redirectTo :'home' , pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'employee/:ID',component:EmployeeDeatilesComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'Addemployee',component:ADDnewEmpComponent},
  //{path:'EditEmployee',component:EditEmployeeComponent},
  {path:'EditEmployee/:ID',component:EditEmployeeComponent},
  {path:'EmployeeAttendance' , component:EmployeeAttendanceComponent},
  {path:'AddEmployeeAttendance' , component:AddemployeeattendanceComponent},
  {path:'EditEmployeeAttendance/:ID/:Date' , component:EditAttendanceComponent},
  {path:'Holiday' , component:HolidayComponent},
  {path: 'EditHoliday/:id', component: EditholidayComponent },
  {path:'EmployeesReports', component:EmployeesReportsComponent},
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
