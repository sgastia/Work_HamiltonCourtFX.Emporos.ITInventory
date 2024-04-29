import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EmployeeInterface } from '../interfaces/employee.interface';

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
        })
      );
  }

  save(employee: EmployeeInterface) {
    let newEmployee;
    let errorMessage;
    this.http.post<EmployeeInterface>('/api/employee', employee)
      .subscribe({
        next: data => {
          newEmployee = data;
          console.log("Data received: " + newEmployee.id);
        },
        error: error => {
          errorMessage = error.message;
          console.error("Error posting employee: " + error.message, error);
        }
      });

  }
}
