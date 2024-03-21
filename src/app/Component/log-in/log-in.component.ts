import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  loginform:FormGroup
  constructor(private service:EmplyeeServiceService , private fb:FormBuilder){
   this.loginform = this.fb.group({
    email:['',Validators.required],
    password:['',Validators.required]
   })
  }

  get email(){
   return this.loginform.get('email')
  }

  get password(){
    return this.loginform.get('password')
   }
 

   login() {
    if (this.loginform.valid) {
      this.service.login(this.email?.value, this.password?.value).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.open('http://localhost:4200/employee', "_self");
          });
        },
        (error) => {
          // Handle error responses
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Please enter a valid username and password.',
          });
        }
      );
    } else {
      // Handle case when form fields are empty
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please enter a valid username and password.',
      });
    }
  }
  
}