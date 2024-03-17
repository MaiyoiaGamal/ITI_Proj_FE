import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeComponent } from './Component/employee/employee.component';
import { HeaderComponent } from './Component/header/header.component';
import { FooterComponent } from './Component/footer/footer.component';
import { EmployeeDeatilesComponent } from './Component/employee-deatiles/employee-deatiles.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ADDnewEmpComponent } from './Component/addnew-emp/addnew-emp.component';
import { EditEmployeeComponent } from './Component/edit-employee/edit-employee.component';
import { EmployeeAttendanceComponent } from './Component/employee-attendance/employee-attendance.component';
import { AddemployeeattendanceComponent } from './Component/addemployeeattendance/addemployeeattendance.component';
import { EditAttendanceComponent } from './Component/edit-attendance/edit-attendance.component';
import { HolidayComponent } from './Component/holiday/holiday.component';
import { EditholidayComponent } from './Component/editholiday/editholiday.component';
import { HomeComponent } from './Component/home/home.component';
import { EmployeesReportsComponent } from './Component/employees-reports/employees-reports.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { LogInComponent } from './Component/log-in/log-in.component';
import { RegisterComponent } from './Component/register/register.component';
import { GenralSettingsComponent } from './Component/genral-settings/genral-settings.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HeaderComponent,
    FooterComponent,
    EmployeeDeatilesComponent,
    ADDnewEmpComponent,
    EditEmployeeComponent,
    EmployeeAttendanceComponent,
    AddemployeeattendanceComponent,
    EditAttendanceComponent,
    HolidayComponent,
    EditholidayComponent,
    HomeComponent,
    EmployeesReportsComponent,
    DashboardComponent,
    LogInComponent,
    RegisterComponent,
    GenralSettingsComponent
  ],
  imports:[
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
   SweetAlert2Module
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
