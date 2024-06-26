import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-attendance',
  templateUrl: './edit-attendance.component.html',
  styleUrls: ['./edit-attendance.component.css']
})
export class EditAttendanceComponent implements OnInit {
  id:number=1;
  employee:any;
  dateform:any;
  dateRoute:any
  nameemplpyee:any;
  employeeform:FormGroup
  errorMessage:string = '';
 constructor(private route:ActivatedRoute , private fb:FormBuilder , private service:EmplyeeServiceService , private location:Location ){
  this.employeeform = this.fb.group({
    name:['',[Validators.required]],
    date:['',[Validators.required]],
    attendens:['',[Validators.required]],
    deperture:['',[Validators.required]]

  })
 }

  get name()
  {
    return this.employeeform.get('name')
  }

  get date()
  {
    return this.employeeform.get('date')
  }

  get attendens()
  {
    return this.employeeform.get('attendens')
  }

  get deperture()
  {
    return this.employeeform.get('deperture')
  }

 
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("ID"))
    this.dateRoute = String(this.route.snapshot.paramMap.get("Date"))
    console.log(this.id)
    this.getEmployeeDetails(this.id,this.dateRoute)
  }

  //  async getEmployeeDetails(id:number , date:any) {
  //   this.service.getempbydateid(id, date).subscribe((data) => {
  //     this.nameemplpyee = data;
  //     ;
  //   });
  //   this.service.getbyId(id).subscribe((data) => {
  //     this.dateform = data;
  //   });
  //   this.service.getattendancebyID(this.id).subscribe(
  //     (employee) => {
  //       this.employee = employee;
  //       this.populateForm(employee);
  //     },
  //     (error) => {
  //       this.errorMessage = 'Error fetching employee satr 74';
  //       console.error(error);
  //     }
  //   );
  // }

  async getEmployeeDetails(id: number, date: any) {
    try {
      const empData = await this.service.getempbydateid(id, date).toPromise();
      this.nameemplpyee = empData;
      console.log(this.nameemplpyee)
      const data = await this.service.getbyId(id).toPromise();
      this.dateform = data;
      console.log(this.dateform)
      // const employee = await this.service.getattendancebyID(id).toPromise();
      // this.employee = employee;
      // console.log(this.employee)
      this.populateForm(this.nameemplpyee);
    } catch (error) {
      this.errorMessage = 'Error fetching employee';
      console.error(error);
    }
  }





  populateForm(employee: any) {
    console.log(this.dateform)
    this.employeeform.patchValue({
      name: this.dateform.fullName,
      date: this.nameemplpyee.date,
      attendens : employee.attendens,
      deperture : employee.deperture,
    });
  }


  updateemployee() // onsu
  {
    if (this.employeeform.valid) {
      const updatedEmployeeData = this.employeeform.value;
      console.log(updatedEmployeeData)
      this.service.updateemployeebyidanddate(this.id,this.dateRoute,updatedEmployeeData).subscribe(
        () => {
          Swal.fire('Success','Employee updated successfully!','success');
          this.employeeform.reset();
          this.location.back()
        },
        (errorResponse) => {if (errorResponse.error === "Attendance cannot be posted on holidays.") {
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
        }
        else if (errorResponse.error === "Can't select date before 2020"){
            Swal.fire('Error',"Can't select date before 2020",'error')
        } 
        else if (errorResponse.error === "Can't select time before 18:00:00")
        {
          Swal.fire('Error',"Can't select time before 18:00:00",'error')
        }
        else if (errorResponse.error === "Can't select time before 9:00:00")
        {
          Swal.fire('Error',"Can't select time before 9:00:00",'error')
        } 
        else if(errorResponse.error === "can't select date after today date")
        {
          Swal.fire('Error',"Can't Select Future Date",'error')
        }
        else if (errorResponse.error === "Can't select time after 12:00:00")
        {
          Swal.fire('Error',"Can't select time  after 12:00:00",'error')
        }
        else {
          console.log(errorResponse)
          Swal.fire('Error', 'An error occurred.', 'error');
        }}
    )}
      }
    }
  
  
