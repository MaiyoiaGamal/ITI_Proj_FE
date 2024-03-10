import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';

@Component({
  selector: 'app-employees-reports',
  templateUrl: './employees-reports.component.html',
  styleUrls: ['./employees-reports.component.css']
})
export class EmployeesReportsComponent implements OnInit {
allempreport:any;
employeeform:FormGroup;
startdatector:any;
enddatector:any;
getempbydate:any
bool:boolean = false;


constructor(private service:EmplyeeServiceService , private fb:FormBuilder){
  this.employeeform = this.fb.group({
    startdate:['',[Validators.required]],
    enddate:['',[Validators.required]]
  })
}

get startdate()
{
  return this.employeeform.get('startdate')
}

get enddate()
{
  return this.employeeform.get('enddate')
}

ngOnInit(): void {
 
  this.service.getempreports().subscribe(s => this.allempreport = s)
}

displaytable()
{
  this.startdatector = this.startdate?.value;
  this.enddatector = this.enddate?.value;
  this.service.getemployessDate(this.startdatector,this.enddatector).subscribe
  ((data) => 
  {
   this.getempbydate = data
   console.log(this.getempbydate)
   this.bool=true
  }

  )
}

onsumbit()
{
 
}

}
