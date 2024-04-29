import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeInterface } from '../../../interfaces/employee.interface';
import { DeviceInterface } from '../../../interfaces/device.interface';
import { DeviceService } from '../../../services/device.service';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,]
})
export class DetailEmployeeComponent implements OnInit {
  employeeItem$!: Observable<EmployeeInterface>;
  devicesList$!: Observable<DeviceInterface[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private devicesService: DeviceService) {

  }

  ngOnInit(): void {
    this.employeeItem$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id')!;
        return this.employeeService.getEmployeeById(id);
      }));

    this.devicesList$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.devicesService.getAllDevices();
      })
    );
  }

  gotoList() {
    this.router.navigate(['/list-employees']);
  }
}
