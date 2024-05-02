import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { DeviceInterface } from '../../../interfaces/device.interface';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DeviceService } from '../../../services/device.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-detail-device',
  templateUrl: './detail-device.component.html',
  styleUrls: ['./detail-device.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatIconModule]
})
export class DetailDeviceComponent implements OnInit {
  deviceItem$!: Observable<DeviceInterface>;
  deviceId: string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService) {

    }

  ngOnInit(): void {
    
    this.deviceItem$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.deviceId = params.get('id')!;    
        return this.deviceService.getDeviceById(this.deviceId);
      }));
    }

  save() {
    console.log('Id: ' + this.deviceId)
  }

  gotoList() {
    this.router.navigate(['/list-devices']);
  }  
}
