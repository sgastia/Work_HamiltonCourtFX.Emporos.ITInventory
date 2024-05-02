import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { DeviceInterface } from '../../../interfaces/device.interface';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DeviceService } from '../../../services/device.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeviceModel } from '../../../models/device';

@Component({
  selector: 'app-detail-device',
  templateUrl: './detail-device.component.html',
  styleUrls: ['./detail-device.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule]
})
export class DetailDeviceComponent implements OnInit {
  selectedDevice$!: Observable<DeviceInterface>;
  deviceId: number = 0;
  deviceTypeControl = new FormControl('');
  descriptionControl = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService) {

  }

  ngOnInit(): void {

    this.selectedDevice$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.deviceId = parseInt(params.get('id')!);
        return this.deviceService.getDeviceById(this.deviceId);
      }));
    this.selectedDevice$.subscribe((device) => {
      this.deviceTypeControl.setValue(device.deviceType);
      this.descriptionControl.setValue(device.description);
    });
  }

  update() {
    console.log("Values: type=" + this.deviceTypeControl.value + ", description=" + this.descriptionControl.value);
    const updatedDevice = new DeviceModel(
      this.deviceId,
      this.deviceTypeControl.value!,
      this.descriptionControl.value!
    );
    this.deviceService.update(this.deviceId, updatedDevice);
  }

  gotoList() {
    this.router.navigate(['/list-devices']);
  }

}
