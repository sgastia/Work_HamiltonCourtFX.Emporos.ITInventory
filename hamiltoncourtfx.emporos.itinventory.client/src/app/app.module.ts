import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './components/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListDevicesComponent } from './forms/devices/list-devices/list-devices.component';
import { DetailDeviceComponent } from './forms/devices/detail-device/detail-device.component';
import { DetailEmployeeComponent } from './forms/employees/detail-employee/detail-employee.component';
import { ListEmployeesComponent } from './forms/employees/list-employees/list-employees.component';


@NgModule({
  declarations: [
    AppComponent,
    ListDevicesComponent,
    DetailDeviceComponent,
    ListEmployeesComponent,
    DetailEmployeeComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
