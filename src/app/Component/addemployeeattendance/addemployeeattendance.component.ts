import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';

@Component({
  selector: 'app-addemployeeattendance',
  templateUrl: './addemployeeattendance.component.html',
  styleUrls: ['./addemployeeattendance.component.css']
})
export class AddemployeeattendanceComponent implements OnInit {
  filteredEmployees:any[]=[];
  try:number = 0;
  employeeForm:FormGroup
  emp:any
  getid:number = 0;
  getallemp:any[]=[];
  employeeAttendanceData:any;
  constructor(private fb:FormBuilder , private service:EmplyeeServiceService) {
    this.employeeForm = this.fb.group({
      date: ['', [Validators.required]],
      attendens: ['', [Validators.required]],
      deperture: ['', [Validators.required,]],
      name: ['', [Validators.required]],
      empid:['', [Validators.required]]
  })
}

filterEmployees(searchTerm: string) {
  this.filteredEmployees = this.getallemp.filter(employee => {
    return employee.fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });
}


onSelect(e:any) {
  this.try = e.target.value;
  console.log('Selected Employee ID:', this.try);
  // Perform any other actions with the selected employee ID
}
get date(){
  return this.employeeForm.get("date")
}
get attendens(){
  return this.employeeForm.get("attendens")
}
get deperture(){
  return this.employeeForm.get("deperture")
}
get name(){
  return this.employeeForm.get("name")
}

get empid(){
  return this.employeeForm.get("empid")
}

ngOnInit(): void {
  this.service.getData().subscribe(p => this.getallemp = p)
}

onSubmit() {
  this.getid = this.try;
  console.log(this.getid)
  if (this.getid ) {
    this.service.getbyId(this.getid ).subscribe(
      (data) => {
        this.emp = data;
        console.log(this.emp);
      },
      (error) => {
        console.error("Error occurred while fetching employee:", error);
        console.log(this.emp);
      });
  const formData = this.employeeForm.value;
  const postData = {
    Employee : this.emp,
    empID:this.getid,
    name:formData.name,
    attendens: formData.attendens,
    deperture: formData.deperture,
    date: formData.date,
  };
  this.service.postEmpattendens(postData).subscribe(
    (response) => {
      console.log('Attendance record added successfully:', response);
      this.employeeForm.reset()
    },
    (error) => {
      console.error('Error occurred while adding attendance record:', error);
    }
  );
}
}
}



























// loadEmployeeData() {
//   this.getid = this.empid?.value;
//   if (this.getid ) {
//     this.service.getbyId(this.getid ).subscribe(
//       (data) => {
//         this.emp = data;
//         console.log(this.emp);
//       },
//       (error) => {
//         console.error("Error occurred while fetching employee:", error);
//         console.log(this.emp);

//       }
//     );
//   } else {
//     console.error("Employee ID is null.");
//     console.log(this.emp);

//   }
// }
