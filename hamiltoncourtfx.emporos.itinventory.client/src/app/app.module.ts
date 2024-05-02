import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListDevicesComponent } from './forms/devices/list-devices/list-devices.component';
import { DetailDeviceComponent } from './forms/devices/detail-device/detail-device.component';
import { DetailEmployeeComponent } from './forms/employees/detail-employee/detail-employee.component';
import { ListEmployeesComponent } from './forms/employees/list-employees/list-employees.component';
import { RouterOutlet, provideRouter } from '@angular/router';
import { appRoutes } from './app-routing.module';
import { AddDeviceComponent } from './forms/devices/add-device/add-device.component';
import { AddEmployeeComponent } from './forms/employees/add-employee/add-employee.component';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterOutlet,
    ListDevicesComponent,
    DetailDeviceComponent,
    AddDeviceComponent,
    ListEmployeesComponent,
    DetailEmployeeComponent,
    AddEmployeeComponent,
  ],
  providers: [
    provideRouter(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
