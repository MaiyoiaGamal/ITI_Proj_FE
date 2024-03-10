import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
 emp:any[]=[]
 
  constructor(private emplyee:EmplyeeServiceService ) {}
  ngOnInit(): void {
    this.emplyee.getData().subscribe(p=>this.emp=p)
  }
  deleteEmployee(employeeId: number, obj:any): void {
    console.log(this.emp)
    obj = this.emp.find((emp: any) => emp.id === employeeId);
    console.log(obj)
    if (confirm("Are you sure you want to delete this item?")) {
      this.emplyee.softDeleteEmployee(employeeId,obj).subscribe(() => {
        alert("Employee deleted successfully");
        this.emplyee.getData().subscribe(p=>this.emp=p)
      },(error)=>{
        console.log(error)
      });
    }
  }
  
}
