import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDevicesComponent } from './forms/devices/list-devices/list-devices.component';
import { DetailDeviceComponent } from './forms/devices/detail-device/detail-device.component';
import { DetailEmployeeComponent } from './forms/employees/detail-employee/detail-employee.component';
import { ListEmployeesComponent } from './forms/employees/list-employees/list-employees.component';
import { AddDeviceComponent } from './forms/devices/add-device/add-device.component';
import { AddEmployeeComponent } from './forms/employees/add-employee/add-employee.component';

export const appRoutes: Routes = [
  {
    path: 'list-devices',
    component: ListDevicesComponent,
  },
  {
    path: 'detail-device/:id',
    component: DetailDeviceComponent,
  },
  {
    path: 'add-device',
    component: AddDeviceComponent,
  },
  {
    path: 'list-employees',
    component: ListEmployeesComponent,
  },
  {
    path: 'detail-employee/:id',
    component: DetailEmployeeComponent,
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent,
  },
];
