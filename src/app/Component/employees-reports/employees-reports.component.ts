import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';

@Component({
  selector: 'app-employees-reports',
  templateUrl: './employees-reports.component.html',
  styleUrls: ['./employees-reports.component.css']
})
export class EmployeesReportsComponent implements OnInit {
allemp:any[]=[];
employeeform:FormGroup;
getempbydate:any
bool:boolean = false;
yearr:number = 0;
monthh:number = 0;
idd:number = 0;
try:any;
filteredEmployeesarray:any[]=[];

constructor(private service:EmplyeeServiceService , private fb:FormBuilder){
  this.employeeform = this.fb.group({
    id:['',Validators.required],
    year:['',[Validators.required]],
    month:['',[Validators.required]]
  })
}
ngOnInit(): void {
  console.log('ngOnInit triggered');
  this.service.getData().subscribe(
      (data) => {
          this.allemp = data; 
          console.log(this.allemp);
      },
      (error) => {
          console.error('Error fetching employees:', error);
      }
  );
}


filterEmployees(searchTerm: string) {
  this.filteredEmployeesarray = this.allemp.filter(employee => {
    return employee.fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });
}




onSelect(e:any) {
  this.try = e.target.value;
  console.log('Selected Employee ID:', this.try);
}

get id()
{
  return this.employeeform.get('id')
}

get year()
{
  return this.employeeform.get('year')
}

get month()
{
  return this.employeeform.get('month')
}




displaytable()
{
  this.idd = this.id?.value;

  this.yearr = this.year?.value;

  this.monthh = this.month?.value;
  
  this.service.getempreportsbyyearidandmonth(this.idd ,this.yearr,this.monthh).subscribe
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

// filterEmployees(searchTerm: any) {
//   console.log(searchTerm)
//   this.filteredEmployeesarray = this.allemp.filter((employee:any) => {
//   return employee.fullName.toLowerCase().includes(searchTerm.toLowerCase());
// });
 
// }
}
