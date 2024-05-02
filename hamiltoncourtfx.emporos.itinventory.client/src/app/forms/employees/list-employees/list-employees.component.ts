import { Component, OnInit } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeInterface } from '../../../interfaces/employee.interface';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatTableModule,
  ]
})
export class ListEmployeesComponent implements OnInit {
  employeesList$!: Observable<EmployeeInterface[]>;
  employeesListToShow$!: Observable<EmployeeInterface[]>;
  selectedId = 0;
  displayedColumns: string[] = ['name', 'email', 'edit'];

  constructor(
    private employeesService: EmployeeService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.employeesList$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = parseInt(params.get('id')!);
        return this.employeesService.getAllEmployees();
      })
    );
    this.employeesListToShow$ = this.employeesList$;
  }

  filterResults(text: string) {
    if (!text) {
      this.employeesListToShow$ = this.employeesList$;
      return;
    }
    this.employeesListToShow$ = this.employeesList$.pipe(
      map(items => items.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.email.toLowerCase().includes(text.toLowerCase())
      )));
  }

}
