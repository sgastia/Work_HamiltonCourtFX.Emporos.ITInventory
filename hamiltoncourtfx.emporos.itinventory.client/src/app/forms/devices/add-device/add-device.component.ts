import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeviceService } from '../../../services/device.service';
import { DeviceModel } from '../../../models/device';
import { Observable, switchMap } from 'rxjs';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class AddDeviceComponent implements OnInit {

  model = new DeviceModel(0, "", "");
  submitted = false;

  onSubmit() { this.submitted = true; }

  constructor(
    private deviceService: DeviceService,
    private router: Router) {
  }
    ngOnInit(): void {
      
    }

  newDevice() {
    const id = 0;
    const deviceType = this.model.deviceType;
    const descrption = this.model.description;
    const device = new DeviceModel(
      id,
      deviceType,
      descrption
    );
    console.log("Saving new device: " + deviceType + ", " + descrption);
    this.deviceService.save(device);
    console.log("New device saved");

    //option 1
    //deviceForm.reset()

    //option 2
    this.router.navigate(['/list-devices']);
  }
}
