import { Injectable, OnInit } from '@angular/core';
import { DeviceInterface } from '../interfaces/device.interface';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { DeviceType } from '../models/deviceType';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService implements OnInit {

  constructor(private http: HttpClient) { }

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

  devices$!: Observable<DeviceInterface[]>;

  ngOnInit(): void {
    this.getAllDevices();
  }

  getAllDevices(): Observable<DeviceInterface[]> {
    this.devices$ = this.http.get<DeviceInterface[]>('/api/device')
      .pipe(
        map((data: DeviceInterface[]) => {
          return data;
        })
      );
    return this.devices$;
  }

  getDeviceById(id: number | string): Observable<DeviceInterface> {
    return this.http.get<DeviceInterface>('/api/device/' + id)
      .pipe(
        map((data: DeviceInterface) => {
          return data;
        })
      );
  }

  save(device: DeviceInterface) {
    let newDevice;
    let errorMessage;
    this.http.post<DeviceInterface>('/api/Device', device)
      .subscribe({
        next: data => {
          newDevice = data;
          console.log("Data received: " + newDevice.id);
        },
        error: error => {
          errorMessage = error.message;
          console.error("Error posting device: " + error.message, error);
        }
      });
  }

  update(id: number, device: DeviceInterface) {
    let newDevice;
    let errorMessage;
    this.http.put<DeviceInterface>('/api/Device/' + id, device)
      .subscribe({
        next: data => {
          newDevice = data;
          console.log("Data received updated");
        },
        error: error => {
          errorMessage = error.message;
          console.error("Error posting device: " + error.message, error);
        }
      });
  }
}
