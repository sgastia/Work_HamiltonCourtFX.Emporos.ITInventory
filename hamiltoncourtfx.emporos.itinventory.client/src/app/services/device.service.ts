import { Injectable } from '@angular/core';
import { DeviceInterface } from '../interfaces/device.interface';
import { Observable, of } from 'rxjs';
import { DeviceType } from '../models/deviceType';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  devicesMock: DeviceInterface[] = [
    {
      id: 1,
      deviceType: "smartphone",
      description: "asdf"
    },
    {
      id: 2,
      deviceType: "smartphone",
      description: "qwer"
    },
    {
      id: 3,
      deviceType: "tablet",
      description: "zcxv"
    },
  ];

  getAllDevices(): Observable<DeviceInterface[]> {
    return of(this.devicesMock);
  }

  getDeviceById(id: number | string): Observable<DeviceInterface> {
    return of(this.devicesMock.find(d => d.id == id)!);
  }

  save(device: DeviceInterface) {
    this.devicesMock.push(device);
  }
}
