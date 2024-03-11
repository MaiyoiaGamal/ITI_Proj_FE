import { Component, OnInit, Output  } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { EmplyeeServiceService  } from 'src/app/Services/emplyee-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css']
})

export class EmployeeAttendanceComponent implements OnInit {
  allemp:any[]=[];
  start:string = '';
  end:string = '';
  employeeform : FormGroup; 
  dataLoaded: boolean = false
  constructor(private service:EmplyeeServiceService , private fb:FormBuilder){
    this.employeeform = this.fb.group({
      startdate:['',[Validators.required,this.dateFormatValidator.bind(this)]],
      enddate:['',[Validators.required,this.dateFormatValidator.bind(this)]],
    },{ validator: this.dateRangeValidator.bind(this) })
  }
  

   after0900(control: AbstractControl): ValidationErrors | null {
    const enteredTime = control.value;
    if (!enteredTime) {
      return null;
    }
    const enteredHours = +enteredTime.split(':')[0];  //09:00:00
    if (enteredHours < 9) {
      return { before0900: true };
    }
    return null;
  }

   dateFormatValidator(control: AbstractControl): { [key: string]: any } | null {
    if (!control.value) {
      return null; 
    }
  
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(control.value)) {
      return { invalidDateFormat: true };
    }
  
    return null;
  }


  get startdate()
  {
   return this.employeeform.get("startdate")
  }
  get enddate()
  {
   return this.employeeform.get("enddate")
  }

  dateRangeValidator(control: AbstractControl): { [key: string]: any } | null {
    const startDate = control.get('startdate')?.value;
    const endDate = control.get('enddate')?.value;

    if (startDate && endDate && startDate > endDate) {
      return { invalidDateRange : true };
    }

    return null;
  }



  onsumbit()
  {
  }

  ngOnInit(): void {
    
  }


  displaytable()
  {
    this.start = this.startdate?.value;
    this.end = this.enddate?.value
    this.service.getallempbydate(this.start ,this.end).subscribe(
      (data: any) => {
        this.allemp = data;
        this.dataLoaded = true;
        console.log(this.allemp)
        this.employeeform.reset()
      },
      (error) => {
        Swal.fire('Error',"Date Not Found Please Enter A Valid Date",'error');
      })
    }
}
