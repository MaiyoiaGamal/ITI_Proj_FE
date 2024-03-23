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
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;
  totalItems: number = 0;
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
        
        this.totalItems = this.allemp.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.updateDisplayedData();
        console.log(this.allemp)
        
      },
      (error) => {
        Swal.fire('Error',"Date Not Found Please Enter A Valid Date",'error');
      })
    }
    
    updateDisplayedData() {
      this.allemp = this.allemp.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
    }
    deleteAttendance(EmployeeId: number, item: any): void {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this item?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteEmployeeAttendance(EmployeeId)
            .subscribe(() => {
              Swal.fire('Success', 'Attendance record deleted successfully', 'success');
              // Optionally, you can remove the deleted item from the array
              const index = this.allemp.indexOf(item);
              if (index !== -1) {
                this.allemp.splice(index, 1);
              }
            }, (error) => {
              console.log(error);
            });
        }
      });
    }
    onPageChange(page: number): void {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.displaytable();
      }
    }
  
    getPageNumbers(): number[] {
      let pagesArray: number[] = [];
      for (let i = 1; i <= Math.ceil(this.totalItems / this.itemsPerPage); i++) {
        pagesArray.push(i);
      }
      return pagesArray;
    }
}
