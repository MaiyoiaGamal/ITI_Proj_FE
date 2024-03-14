import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';
import Swal from 'sweetalert2';

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
        Swal.fire('Error',"Error occurred while fetching employee:",'error');
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
      Swal.fire('Success','Attendance record added successfully:','success');
      this.employeeForm.reset()
    },
    (errorResponse) => {
      if (errorResponse.error === "Attendance cannot be posted on holidays.") {
        console.log(errorResponse)
        Swal.fire('Error', 'Attendance cannot be posted on holidays.', 'error');
      } else if (errorResponse.error === 'Employee not found.') {
        console.log(errorResponse)
        Swal.fire('Error', 'Employee not found.', 'error');
      } else if (errorResponse.error === "Attendance for the same date already exists.") {
        console.log(errorResponse)
        Swal.fire('Error', 'Attendance for the same date already exists.', 'error');
      } else if (errorResponse.error === "Attendance cannot be posted on weekends.") {
        console.log(errorResponse)
        Swal.fire('Error', "Attendance cannot be posted on weekends.", 'error');
      }else {
        console.log(errorResponse)
        Swal.fire('Error', 'An error occurred.', 'error');
      }}
  )}
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
