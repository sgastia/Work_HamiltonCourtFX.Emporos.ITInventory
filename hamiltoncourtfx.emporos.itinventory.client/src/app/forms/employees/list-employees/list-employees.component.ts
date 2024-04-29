import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeInterface } from '../../../interfaces/employee.interface';
@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ]
})
export class ListEmployeesComponent implements OnInit {
  employeesList$!: Observable<EmployeeInterface[]>;
  selectedId = 0;

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
  }

  filterResults(text: string) {
    if (!text) {

      return;
    }
  }

}
