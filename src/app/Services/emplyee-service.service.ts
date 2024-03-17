import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class EmplyeeServiceService {
  private apiUrl = 'https://localhost:44372/api/Holidays';
  private apiUrl1 = 'https://localhost:44372/api/Holidays';
  private apiUrl2 = 'https://localhost:44372/api/Holidays';
  
  constructor(private httpClient:HttpClient) {}
    getData():Observable<any>{
      return this.httpClient.get("https://localhost:44372/api/Employees");
    }

    getbyId(id:number):Observable<any>{
      return this.httpClient.get(`https://localhost:44372/api/Employees/`+id)
    }

    AddEmp(emp:any):Observable<any>{
      return this.httpClient.post(`https://localhost:44372/api/Employees`,emp)
    }

    // softDeleteEmployee(employeeId: number , empfullobject:any): Observable<any> {
    //   // empfullobject.isDeleted = true;
    //   return this.httpClient.put(`http://localhost:5256/api/EmployeesTest/`+employeeId , empfullobject);
    // }

    softDeleteEmployee(employeeId: number , empfullobject:any): Observable<any> {
      empfullobject.isDeleted = true;
      return this.httpClient.put(`https://localhost:44372/api/Employees/${employeeId}/soft-delete`, empfullobject );
    }
    
    

    updateEmployee(employeeID:Number , emloyeefullobject:any):Observable<any>
    {
      return  this.httpClient.put(`https://localhost:44372/api/Employees/`+employeeID , emloyeefullobject);
    }
   
   GetAllEmpAttendse():Observable<any>{
    return this.httpClient.get("https://localhost:44372/api/EmployeeAttndens");
   }

   postEmpattendens(emp:any):Observable<any>{
    return this.httpClient.post(" https://localhost:44372/api/EmployeeAttndens", emp )
   }

   getempbydate(employeeID:Number , startdate:string,enddate:string)
   {
    return this.httpClient.get(`https://localhost:44372/api/Employees/api/attendance/${employeeID}/${startdate}/${enddate}`)
   }

   getallempbydate( startdate:string,enddate:string)
   {
    return this.httpClient.get(`https://localhost:44372/api/Employees/api/attendance/${startdate}/${enddate}`)
   }


   getattendancebyID(id:number)
   {
     return this.httpClient.get(`https://localhost:44372/api/EmployeeAttndens/`+id)
   }

   editemployeeattendance(employeeid:number , employee:any)
   {
    return this.httpClient.put(`https://localhost:44372/api/EmployeeAttndens/`+employeeid,employee)
   }
   getHolidays():Observable<any>{
    return this.httpClient.get("https://localhost:44372/api/Holidays");
  }
  addHoliday(holiday: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl1, holiday);
  }
  updateHoliday(updatedHolidayId: number, updatedHolidayData: any): Observable<any> {
    const url = `${this.apiUrl}/${updatedHolidayId}`;
    return this.httpClient.put(url, updatedHolidayData);
  }
  getHolidayById(id:number): Observable<any>
   {
    return this.httpClient.get(`https://localhost:44372/api/Holidays/${id}`);
   }
   deleteHoliday(holidayId: number): Observable<any> {
    const url = `${this.apiUrl2}/${holidayId}`;
    return this.httpClient.delete(url);
  }


  getempbydateid(id:number , date:string)
   {
    return this.httpClient.get(`https://localhost:44372/api/EmployeeAttndens/${id}/${date}/getbydateandid`)
   }
  

  updateemployeebyidanddate(id:number,date:string,employee:any):Observable<any>
  {
  return this.httpClient.put(`https://localhost:44372/api/EmployeeAttndens/${id}/${date}/updatebyidanddate`,employee)
  }

  getempreports():Observable<any>
  {
   return this.httpClient.get(`https://localhost:44372/api/NetSalaries`)
  }

  getemployessDate(startdate:string,enddate:string):Observable<any>
  {
     return this.httpClient.get(`https://localhost:44372/api/NetSalaries/${startdate}/${enddate}`)
  }
   

   getempreportsbyyearidandmonth(id:number , year:number , month:number)
   {
   return this.httpClient.get(`https://localhost:44372/api/Salary/${id}/${year}/${month}`)
   }
   
}
