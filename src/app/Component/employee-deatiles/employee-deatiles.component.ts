import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmplyeeServiceService } from 'src/app/Services/emplyee-service.service';

@Component({
  selector: 'app-employee-deatiles',
  templateUrl: './employee-deatiles.component.html',
  styleUrls: ['./employee-deatiles.component.css']
})
export class EmployeeDeatilesComponent implements OnInit{
  id:number = 0 ;
  emp:any;
 
  constructor(private ApiEmp:EmplyeeServiceService ,private activeroute:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.id = Number(this.activeroute.snapshot.paramMap.get("ID"))
    this.ApiEmp.getbyId(this.id).subscribe(s=> this.emp = s)
  }

  oneditclick(id:number){
    let obj = this.ApiEmp.getbyId(id).subscribe(s=> this.emp = s)
    console.log(obj)
  }

}
