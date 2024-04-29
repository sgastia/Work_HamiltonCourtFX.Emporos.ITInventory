import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeInterface } from '../../../interfaces/employee.interface';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class DetailEmployeeComponent implements OnInit {
  employeeItem$!: Observable<EmployeeInterface>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.employeeItem$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id')!;
        return this.employeeService.getEmployeeById(id);
      }));
  }

  gotoList() {
    this.router.navigate(['/list-employees']);
  }
}
