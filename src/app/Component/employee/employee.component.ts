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
 currentPage: number = 1;
 itemsPerPage: number = 6;
 totalPages: number = 0;
 totalItems: number = 0;

 
  constructor(private emplyee:EmplyeeServiceService ) {}
  ngOnInit(): void {
   this.loadData();
  
  }
  loadData(): void {
    this.emplyee.getData().subscribe((data: any) => {
      this.emp = data;
      this.totalItems = this.emp.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.emp = this.emp.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
    });
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
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) { // Ensure page is within valid range
      this.currentPage = page;
      this.loadData(); // Load data for the selected page
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
