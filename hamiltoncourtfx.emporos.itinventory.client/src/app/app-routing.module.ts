import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDevicesComponent } from './forms/devices/list-devices/list-devices.component';
import { DetailDeviceComponent } from './forms/devices/detail-device/detail-device.component';
import { DetailEmployeeComponent } from './forms/employees/detail-employee/detail-employee.component';
import { ListEmployeesComponent } from './forms/employees/list-employees/list-employees.component';
import { AddDeviceComponent } from './forms/devices/add-device/add-device.component';

export const appRoutes: Routes = [
  {
    path: 'list-devices',
    component: ListDevicesComponent,
  },
  {
    path: 'list-employees',
    component: ListEmployeesComponent,
  },
  {
    path: 'detail-employee',
    component: DetailEmployeeComponent,
  },
  {
    path: 'detail-device/:id',
    component: DetailDeviceComponent,
  },
  {
    path: 'add-device',
    component: AddDeviceComponent,
  },
];
