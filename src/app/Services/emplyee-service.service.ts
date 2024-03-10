import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})

export class EmplyeeServiceService {
  private API_URL= 'http://10.211.55.3:5000';
  private apiUrl = 'http://10.211.55.3:5000/api/Holidays';
  private apiUrl2 = 'http://10.211.55.3:5000/api/Holidays';
  constructor(private httpClient:HttpClient) {}
    getData():Observable<any>{
      return this.httpClient.get("http://10.211.55.3:5000/api/EmployeesTest");
    }

    getbyId(id:number):Observable<any>{
      return this.httpClient.get(`http://10.211.55.3:5000/api/EmployeesTest/`+id)
    }

    AddEmp(emp:any):Observable<any>{
      return this.httpClient.post(`http://10.211.55.3:5000/api/EmployeesTest`,emp)
    }

    // softDeleteEmployee(employeeId: number , empfullobject:any): Observable<any> {
    //   // empfullobject.isDeleted = true;
    //   return this.httpClient.put(`http://10.211.55.3:5000/api/EmployeesTest/`+employeeId , empfullobject);
    // }

    softDeleteEmployee(employeeId: number , empfullobject:any): Observable<any> {
      empfullobject.isDeleted = true;
      return this.httpClient.put(`http://10.211.55.3:5000/api/EmployeesTest/${employeeId}/soft-delete`, empfullobject );
    }
    
    

    updateEmployee(employeeID:Number , emloyeefullobject:any):Observable<any>
    {
      return  this.httpClient.put(`http://10.211.55.3:5000/api/EmployeesTest/`+employeeID , emloyeefullobject);
    }
   
   GetAllEmpAttendse():Observable<any>{
    return this.httpClient.get("http://10.211.55.3:5000/api/EmployeeAttndens");
   }

   postEmpattendens(emp:any):Observable<any>{
    return this.httpClient.post(" http://10.211.55.3:5000/api/EmployeeAttndens", emp )
   }

   getempbydate(employeeID:Number , startdate:string,enddate:string)
   {
    return this.httpClient.get(`http://10.211.55.3:5000/api/EmployeesTest/api/attendance/${employeeID}/${startdate}/${enddate}`)
   }

   getallempbydate( startdate:string,enddate:string)
   {
    return this.httpClient.get(`http://10.211.55.3:5000/api/EmployeesTest/api/attendance/${startdate}/${enddate}`)
   }


   getattendancebyID(id:number)
   {
     return this.httpClient.get(`http://10.211.55.3:5000/api/EmployeeAttndens/`+id)
   }

   editemployeeattendance(employeeid:number , employee:any)
   {
    return this.httpClient.put(`http://10.211.55.3:5000/api/EmployeeAttndens/`+employeeid,employee)
   }
   getHolidays():Observable<any>{
    return this.httpClient.get("http://10.211.55.3:5000/api/Holidays");
  }
  addHoliday(newHoliday: any): Observable<any> {
    return this.httpClient.post<any>(`http://10.211.55.3:5000/api/Holidays`, newHoliday);
  }
  updateHoliday(updatedHolidayId: number, updatedHolidayData: any): Observable<any> {
    const url = `${this.apiUrl}/${updatedHolidayId}`;
    return this.httpClient.put(url, updatedHolidayData);
  }
  getHolidayById(id:number): Observable<any>
   {
    return this.httpClient.get(`http://10.211.55.3:5000/api/Holidays/${id}`);
   }
   deleteHoliday(holidayId: number): Observable<any> {
    const url = `${this.apiUrl2}/${holidayId}`;
    return this.httpClient.delete(url);
  }


  getempbydateid(id:number , date:string)
   {
    return this.httpClient.get(`http://10.211.55.3:5000/api/EmployeeAttndens/${id}/${date}/getbydateandid`)
   }
  

  updateemployeebyidanddate(id:number,date:string,employee:any):Observable<any>
  {
  return this.httpClient.put(`http://10.211.55.3:5000/api/EmployeeAttndens/${id}/${date}/updatebyidanddate`,employee)
  }

  getempreports():Observable<any>
  {
   return this.httpClient.get(`http://10.211.55.3:5000/api/NetSalaries`)
  }

  getemployessDate(startdate:string,enddate:string):Observable<any>
  {
     return this.httpClient.get(`http://10.211.55.3:5000/api/NetSalaries/${startdate}/${enddate}`)
  }

}
