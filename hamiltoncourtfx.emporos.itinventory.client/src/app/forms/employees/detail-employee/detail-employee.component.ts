import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeInterface } from '../../../interfaces/employee.interface';
import { DeviceInterface } from '../../../interfaces/device.interface';
import { DeviceService } from '../../../services/device.service';
import { ResponseMessage } from '../../../models/responseMessage';

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

  isInList(devices: DeviceInterface[], deviceItem: DeviceInterface) {
    if (devices.find(d => d.id == deviceItem.id)) {
      return true;
    } else {
      return false;
    }
  }

  relateDevice(employeeItem: EmployeeInterface, deviceItem: DeviceInterface) {
    console.log('Relating: employeeItem=' + employeeItem.id + ', deviceItem=' + deviceItem.id);
    const responseMessage$ = this.employeeService.relate(employeeItem.id, deviceItem.id);
    responseMessage$.subscribe({
      next: responseMessage => {
        if (responseMessage.isOk) {
          console.log("Data saved");
        } else {
          console.error("Failed to save data: " + responseMessage.message);
        }
      },
      error: error => {
        console.error("Error relating employee and device: " + error.message, error);
      }
    });
  }
}
