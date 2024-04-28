import { Injectable } from '@angular/core';
import { DeviceInterface } from '../interfaces/device.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  devicesMock: DeviceInterface[] = [
    {
      id: 1,
      deviceTypeId: 1,
      deviceType: "smartphone",
      description: "asdf"
    },
    {
      id: 2,
      deviceTypeId: 1,
      deviceType: "smartphone",
      description: "qwer"
    },
    {
      id: 3,
      deviceTypeId: 2,
      deviceType: "tablet",
      description: "zcxv"
    },
  ];

  getAllDevices(): Observable<DeviceInterface[]> {
    return of(this.devicesMock);
  }
}
