import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addnew-emp',
  templateUrl: './addnew-emp.component.html',
  styleUrls: ['./addnew-emp.component.css']
})
export class ADDnewEmpComponent {
  employeeForm: FormGroup;
  minDate:string;
  date: Date | undefined;
  constructor(private fb: FormBuilder, private employeeService:EmplyeeServiceService) {
    this.minDate = '2020-01-01'
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      ssn: ['', [Validators.required, Validators.maxLength(14),Validators.pattern('^[0-9]{14}$')]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{6,14}$')]],
      nationality: ['', [Validators.required, Validators.maxLength(15),Validators.pattern('^[a-zA-Z]{1,15}$')]],
      sex: ['', [Validators.required, Validators.maxLength(6),Validators.pattern('^(male|female|Male|Female)$')]],
      birthDate: ['', [Validators.required,this.minAgeValidator.bind(this),this.maxAgeValidator.bind(this)]],
      contractDate: ['', [Validators.required,this.minContractDateValidator.bind(this),this.maxContractDateValidator.bind(this)]],
      salary: ['', [Validators.required, Validators.pattern(/^\d+$/),this.minSalaryValidator.bind(this)]],//Validators.pattern(/^\d+(\.\d{1,2})?$/)]
      // attendens: ['', [Validators.required]],
      // deperture: ['', [Validators.required]],
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

maxAgeValidator(control: AbstractControl): {[key: string]: any} | null {
  const birthDateValue = control.value;
  const birthDate = new Date(birthDateValue);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  if (age > 50) {
    return { 'maxAge': true }; 
  }
  
  return null; 
}


minContractDateValidator(control: AbstractControl): {[key: string]: any} | null {
  const contractDateValue = control.value;
  const contractDate = new Date(contractDateValue);
  const minDate = new Date('2020-01-01'); 

  if (contractDate < minDate) {
    return { 'minContractDate': true }; 
  }

  return null;
}


maxContractDateValidator(control: AbstractControl): {[key: string]: any} | null {
  const contractDateValue = control.value;
  const contractDate = new Date(contractDateValue);
  const maxDate = new Date('2040-01-01'); 

  if (contractDate > maxDate) {
    return { 'maxContractDate': true }; 
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

onSubmit() {
  if (this.employeeForm.valid) {
    this.employeeService.AddEmp(this.employeeForm.value).subscribe(
      () => {
        Swal.fire('Success', 'Employee added successfully!' , 'success');
        this.employeeForm.reset();
      },
      (error: any) => { 
        if (error.status === 409) {
          Swal.fire('Error', 'Employee with the same name already exists.', 'error');
        } else {
          console.error('An error occurred while adding employee:', error);
          Swal.fire('Error', 'Failed to add employee. Please try again.', 'error');
        }
      }
    );
  } else {
    Swal.fire('Error', 'There\'s something wrong with the fields. Please complete them and try again.', 'error');
  }
}

showAllErrors() {
  Object.keys(this.employeeForm.controls).forEach(field => {
    const control = this.employeeForm.get(field);
    control?.markAsTouched({ onlySelf: true });
  });
}




}
