import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class EmplyeeServiceService {
  private baseURL = "http://10.211.55.3:5256"
  //private baseURL = "http://localhost:5256"
  private apiUrl = this.baseURL+'/api/Holidays';
  private apiUrl1 = this.baseURL+"/api/Holidays";
  private apiUrl2 = this.baseURL+"/api/Holidays";
  
  constructor(private httpClient:HttpClient) {}
    getData():Observable<any>{
      return this.httpClient.get(this.baseURL+"/api/Employees");
    }

    getbyId(id:number):Observable<any>{
      return this.httpClient.get(`${this.baseURL}/api/Employees/`+id)
    }

    AddEmp(emp:any):Observable<any>{
      return this.httpClient.post(`${this.baseURL}/api/Employees`,emp)
    }

    // softDeleteEmployee(employeeId: number , empfullobject:any): Observable<any> {
    //   // empfullobject.isDeleted = true;
    //   return this.httpClient.put(`${this.baseURL}/api/EmployeesTest/`+employeeId , empfullobject);
    // }

    softDeleteEmployee(employeeId: number , empfullobject:any): Observable<any> {
      empfullobject.isDeleted = true;
      return this.httpClient.put(`${this.baseURL}/api/Employees/${employeeId}/soft-delete`, empfullobject );
    }
    
    

    updateEmployee(employeeID:Number , emloyeefullobject:any):Observable<any>
    {
      return  this.httpClient.put(`${this.baseURL}/api/Employees/`+employeeID , emloyeefullobject);
    }
   
   GetAllEmpAttendse():Observable<any>{
    return this.httpClient.get(this.baseURL+"/api/EmployeeAttndens");
   }

   postEmpattendens(emp:any):Observable<any>{
    return this.httpClient.post(this.baseURL+"/api/EmployeeAttndens", emp )
   }

   getempbydate(employeeID:Number , startdate:string,enddate:string)
   {
    return this.httpClient.get(`${this.baseURL}/api/Employees/api/attendance/${employeeID}/${startdate}/${enddate}`)
   }

   getallempbydate( startdate:string,enddate:string)
   {
    return this.httpClient.get(`${this.baseURL}/api/Employees/api/attendance/${startdate}/${enddate}`)
   }


   getattendancebyID(id:number)
   {
     return this.httpClient.get(`${this.baseURL}/api//EmployeeAttndens/`+id)
   }

   editemployeeattendance(employeeid:number , employee:any)
   {
    return this.httpClient.put(`${this.baseURL}/api/EmployeeAttndens/`+employeeid,employee)
   }
   deleteEmployeeAttendance(employeeId: number,data:string) {
    return this.httpClient.delete(`${this.baseURL}/api/EmployeeAttndens/${employeeId}/attendance/${data}`);
  }
  
   getHolidays():Observable<any>{
    return this.httpClient.get(this.baseURL+"/api/Holidays");
  }
  addHoliday(holidayData: any): Observable<any> {
    return this.httpClient.post<any>(this.baseURL+'/api/Holidays', holidayData);
  }
  
  updateHoliday(updatedHolidayId: number, updatedHolidayData: any): Observable<any> {
    const url = `${this.apiUrl}/${updatedHolidayId}`;
    return this.httpClient.put(url, updatedHolidayData);
  }
  getHolidayById(id:number): Observable<any>
   {
    return this.httpClient.get(`${this.baseURL}/api/Holidays/${id}`);
   }
   deleteHoliday(holidayId: number): Observable<any> {
    const url = `${this.apiUrl2}/${holidayId}`;
    return this.httpClient.delete(url);
  }


  getempbydateid(id:number , date:string)
   {
    return this.httpClient.get(`${this.baseURL}/api/EmployeeAttndens/${id}/${date}/getbydateandid`)
   }
  

  updateemployeebyidanddate(id:number,date:string,employee:any):Observable<any>
  {
  return this.httpClient.put(`${this.baseURL}/api/EmployeeAttndens/${id}/${date}/updatebyidanddate`,employee)
  }

  getempreports():Observable<any>
  {
   return this.httpClient.get(`${this.baseURL}/api/NetSalaries`)
  }

  getemployessDate(startdate:string,enddate:string):Observable<any>
  {
     return this.httpClient.get(`${this.baseURL}/api/NetSalaries/${startdate}/${enddate}`)
  }
   

   getempreportsbyyearidandmonth(id:number , year:number , month:number)
   {
   return this.httpClient.get(`${this.baseURL}/api/Salary/${id}/${year}/${month}`)
   }
   

   login(email:string,password:string):Observable<any>
   {
    let login = {email,password}
    return this.httpClient.post(`${this.baseURL}/api/Account/login` , login)
   }

   Registertion(login:any):Observable<any>
   {
    return this.httpClient.post(`${this.baseURL}/api/Account/Register`, login)
   }

   registertionnum2(data:any):Observable<any>
   {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    return this.httpClient.post(`${this.baseURL}/api/Account/Register` , data , { headers:headers , responseType: 'text'} )
   }
    

   getGenralSettings():Observable<any>
   {
    return this.httpClient.get(this.baseURL+'/api/Settings')
   }



   postGenralSettings(setting:any):Observable<any>
   {
    return this.httpClient.post(this.baseURL+'/api/Settings',setting);
   }

}
