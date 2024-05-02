import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { EmployeeInterface } from '../interfaces/employee.interface';
import { ResponseMessage } from '../models/responseMessage';
import { EmployeeDeviceRelationship } from '../models/employeeDeviceRelationship';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnInit {

  constructor(private http: HttpClient) { }
  employees$!: Observable<EmployeeInterface[]>;

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): Observable<EmployeeInterface[]> {
    this.employees$ = this.http.get<EmployeeInterface[]>('/api/employee')
      .pipe(
        map((data: EmployeeInterface[]) => {
          return data;
        })
      );
    return this.employees$;
  }

  getEmployeeById(id: number | string): Observable<EmployeeInterface> {
    return this.http.get<EmployeeInterface>('/api/employee/' + id)
      .pipe(
        map((data: EmployeeInterface) => {
          return data;
        }),
        catchError((err, caught) => {
          console.error("It failed to retrieve employee id=" + id, err);
          throw err;
        })
      );
  }

  save(employee: EmployeeInterface) {
    let newEmployee;
    let errorMessage;
    this.http.post<EmployeeInterface>('/api/employee', employee)
      .subscribe({
        next: data => {
          console.log("Employee saved, data: " + data);
        },
        error: error => {
          errorMessage = error.message;
          console.error("Error posting employee: " + error.message, error);
        }
      });
  }

  relate(employeeId: number, deviceId: number): Observable<ResponseMessage> {
    const employeeDeviceRelationship = new EmployeeDeviceRelationship(employeeId, deviceId);
    const responseMessage = this.http.post<ResponseMessage>('/api/employee/relatedevice?', employeeDeviceRelationship);
    return responseMessage;
  }

  updateEmployeeData(employeeId: number, employee: EmployeeInterface) {
    let newDevice;
    let errorMessage;
    this.http.put<EmployeeInterface>('/api/Employee/' + employeeId, employee)
      .subscribe({
        next: data => {
          newDevice = data;
          console.log("Data received updated");
        },
        error: error => {
          errorMessage = error.message;
          console.error("Error posting device: " + error.message, error);
        }
      });
  }
}
