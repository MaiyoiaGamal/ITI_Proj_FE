import { compileNgModule } from '@angular/compiler';
import { Component, NgModule, OnInit } from '@angular/core';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
 // Import MatCardModule here
})

export class EmployeeComponent implements OnInit{
 emp:any[]=[]
 

 
  constructor(private emplyee:EmplyeeServiceService ) {}
  ngOnInit(): void {
    //this.emplyee.getData().subscribe(p=>this.emp=p)
    this.emplyee.getData().subscribe(p=>this.emp=p)
  
  }
  
  deleteEmployee(employeeId: number, obj: any): void {
    console.log(this.emp);
    obj = this.emp.find((emp: any) => emp.id === employeeId);
    console.log(obj);
  
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
        this.emplyee.softDeleteEmployee(employeeId, obj).subscribe(() => {
          Swal.fire('Success', 'Employee deleted successfully', 'success');
          this.emplyee.getData().subscribe(p => this.emp = p);
        }, (error) => {
          console.log(error);
        });
      }
    });
  }
  
  
}
