// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';

// @Component({
//   selector: 'app-edit-employee',
//   templateUrl: './edit-employee.component.html',
//   styleUrls: ['./edit-employee.component.css']
// })
// export class EditEmployeeComponent implements OnInit {
//   employeeForm: FormGroup;
//   employee:object = {}; 
//   employeeId: number = 0;
//   errorMessage:any;

//   constructor(private fb: FormBuilder, private employeeService:EmplyeeServiceService , private Activeroute:ActivatedRoute) {
//     this.employeeForm = this.fb.group({
//       fullName: ['', [Validators.required,Validators.pattern(/^[a-zA-Z ]+$/)]],
//       email: ['', [Validators.required, Validators.email]],
//       ssn: ['', [Validators.required, Validators.maxLength(14)]],
//       address: ['', [Validators.required]],
//       phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
//       nationality: ['', [Validators.required, Validators.maxLength(15)]],
//       sex: ['', [Validators.required, Validators.maxLength(6)]],
//       birthDate: ['', [Validators.required]],
//       contractDate: ['', [Validators.required]],
//       salary: ['', [Validators.required]],//Validators.pattern(/^\d+(\.\d{1,2})?$/)]
//       // attendens: ['', [Validators.required]],
//       // deperture: ['', [Validators.required]],
//     });
//   }
  

//   get fullName(){
//     return this.employeeForm.get('fullName')
//  }
//  get email(){
//   return this.employeeForm.get('email')
// }
// get ssn(){
//   return this.employeeForm.get('ssn')
// }
// get address(){
//   return this.employeeForm.get('address')
// }
// get phoneNumber(){
//   return this.employeeForm.get('phoneNumber')
// }
// get nationality(){
//   return this.employeeForm.get('nationality')
// }
// get sex(){
//   return this.employeeForm.get('sex')
// }
// get birthDate(){
//   return this.employeeForm.get('birthDate')
// }
// get contractDate(){
//   return this.employeeForm.get('contractDate')
// }
// get salary(){
//   return this.employeeForm.get('salary')
// }
// get attendens(){
//   return this.employeeForm.get('attendens')
// }
// get deperture(){
//   return this.employeeForm.get('deperture')
// }
// ngOnInit() {
//   const employeeId = Number(this.Activeroute.snapshot.paramMap.get('ID'));
//   console.log(employeeId)
//   this.employeeService.getbyId(employeeId)
//     .subscribe(employee => {
//       this.employee = employee;
//     }, error => {
//       this.errorMessage = 'Error fetching employee';
//       console.error(error);
//     });
// }
// getEmployeeDetails() {
//   this.employeeService.getbyId(this.employeeId).subscribe(
//     (employee) => {
//       this.employee = employee;
//       this.employeeForm.patchValue({
//         fullName: employee.fullName,
//         email: employee.email,
//         ssn: employee.ssn,
//         address: employee.address,
//         phoneNumber: employee.phoneNumber,
//         nationality: employee.nationality,
//         sex: employee.sex,
//         birthDate: employee.birthDate,
//         contractDate: employee.contractDate,
//         salary: employee.salary
//       });
//     },
//     (error) => {
//       console.error('Error fetching employee details:', error);
//     }
//   );
// }

// onSubmit() {
//   if (this.employeeForm.valid) {
//     const updatedEmployeeData = this.employeeForm.value;
//     this.employeeService.updateEmployee(this.employeeId, updatedEmployeeData).subscribe(
//       () => {
//         alert('Employee updated successfully!');
//         this.employeeForm.reset();
//       },
//       (error) => {
//         console.error('Error updating employee:', error);
//         alert('Failed to update employee. Please try again.');
//       }
//     );
//   } else {
//     alert('Form is not valid. Please fill all required fields.');
//   }
// }


//  UpdateEmp(id:number){
  
//   this.employeeService.getbyId(id) 
//       .subscribe(employee => {
//         this.employee = employee;
//       });
//   }
//  }

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employee: any = {};
  employeeId: number = 0;
  errorMessage: any;
  minDate: string;
  minage:string;
 
  constructor(private fb: FormBuilder, private employeeService: EmplyeeServiceService, private Activeroute: ActivatedRoute , private location:Location) {
    this.minDate = '2020-01-01'
    this.minage = '2004-01-01'
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{6,20}$/)]],
      email: ['', [Validators.required, Validators.email]],
      ssn: ['', [Validators.required, Validators.maxLength(14),Validators.pattern('^[0-9]{14}$')]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      nationality: ['', [Validators.required, Validators.maxLength(15),Validators.pattern('^[a-zA-Z]{1,15}$')]],
      sex: ['', [Validators.required, Validators.maxLength(6),Validators.pattern('^(male|female|Male|Female)$')]],
      birthDate: ['', [Validators.required,this.minAgeValidator.bind(this)]], 
      contractDate: ['', [Validators.required]],
      salary: ['', [Validators.required,Validators.pattern(/^\d+$/),this.minSalaryValidator.bind(this)]],
    });
  }
  minSalaryValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (value && parseInt(value, 10) < 2000) {
      return { 'minSalary': true };
    }
    return null;
  }

  minAgeValidator(control: AbstractControl): {[key: string]: any} | null {
    const birthDateValue = control.value;
    const birthDate = new Date(birthDateValue);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age <= 20) {
        return { 'minAge': true }; 
    }
    return null; 
}
  
  
  get fullName(){
  return this.employeeForm.get('fullName')
 }
 get email(){
  return this.employeeForm.get('email')
}
get ssn(){
  return this.employeeForm.get('ssn')
}
get address(){
  return this.employeeForm.get('address')
}
get phoneNumber(){
  return this.employeeForm.get('phoneNumber')
}
get nationality(){
  return this.employeeForm.get('nationality')
}
get sex(){
  return this.employeeForm.get('sex')
}
get birthDate(){
  return this.employeeForm.get('birthDate')
}
get contractDate(){
  return this.employeeForm.get('contractDate')
}
get salary(){
  return this.employeeForm.get('salary')
}
get attendens(){
  return this.employeeForm.get('attendens')
}
get deperture(){
  return this.employeeForm.get('deperture')
}

  ngOnInit() {
    this.employeeId = Number(this.Activeroute.snapshot.paramMap.get('ID'));
    this.getEmployeeDetails();
  }

  getEmployeeDetails() {
    this.employeeService.getbyId(this.employeeId).subscribe(
      (employee) => {
        this.employee = employee;
        this.populateForm(employee);
      },
      (error) => {
        this.errorMessage = 'Error fetching employee';
        console.error(error);
      }
    );
  }

  populateForm(employee: any) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      email: employee.email,
      ssn: employee.ssn,
      address: employee.address,
      phoneNumber: employee.phoneNumber,
      nationality: employee.nationality,
      sex: employee.sex,
      birthDate: employee.birthDate,
      contractDate: employee.contractDate,
      salary: employee.salary
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const updatedEmployeeData = this.employeeForm.value;
      console.log(updatedEmployeeData)
      this.employeeService.updateEmployee(this.employeeId, updatedEmployeeData).subscribe(
        () => {
          alert('Employee updated successfully!');
          this.employeeForm.reset();
        },
        (error) => {
          console.error('Error updating employee:', error);
          alert('Failed to update employee. Please try again.');
        }
      );
    } else {
      alert('Form is not valid. Please fill all required fields.');
    }
  }


  backtolist(){
   if( this.employeeForm.valid  ) 
   {
    alert('Employee updated successfully!');
     window.open('/employee',"_Self")
   }
  }
}
