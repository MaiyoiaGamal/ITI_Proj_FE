import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form:FormGroup
  ddd:any;
  formdata:any;
  errorMessages:any;
  constructor(private service:EmplyeeServiceService , private fb:FormBuilder){
    this.form = this.fb.group({
      username:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      passwordConfirmed:['',Validators.required]
    })
  }

  get username(){
    return this.form.get('username')
  }
  get email(){
    return this.form.get('email')
  }
  get password(){
    return this.form.get('password')
  }
  get passwordConfirmed(){
    return this.form.get('passwordConfirmed')
  }
  // passwordMatchValidator(): ValidatorFn {
  //   return (control: AbstractControl): Promise<ValidationErrors | null> => {
  //     return new Promise((resolve) => {
  //       const password = control.get('password');
  //       const confirmPassword = control.get('confirmpassword');
  
  //       if (password && confirmPassword && password.value !== confirmPassword.value) {
  //         resolve({ 'passwordMismatch': true });
  //       } else {
  //         resolve(null);
  //       }
  //     });
  //   };
  // }

  registerfn() { 
  this.formdata = {
    username: this.username?.value,
    email: this.email?.value,
    password: this.password?.value,
    passwordConfirmed: this.passwordConfirmed?.value,
  };
  console.log(this.formdata)
  this.service.registertionnum2(this.formdata).subscribe(
    () => {
      window.open("/employee", "_self");
    },
    (error) => {
      console.log("Logs");
      if (error.status === 200) {
        Swal.fire("Success", "Account Created Successfully", "success");
      } else {
        console.log(error)
        if(error.error === "The password and confirm password do not match.")
        {
          Swal.fire('Password Match Error','Password not matched','error')
        }else 
        {
        Swal.fire("Error", "An error occurred while registering. Please try again later.", "error");
        }
        
      }
    }
  );
  

  }

  showAllErrors() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

}
