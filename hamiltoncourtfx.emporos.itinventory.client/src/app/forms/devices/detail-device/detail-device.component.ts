import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { DeviceInterface } from '../../../interfaces/device.interface';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DeviceService } from '../../../services/device.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-device',
  templateUrl: './detail-device.component.html',
  styleUrls: ['./detail-device.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class DetailDeviceComponent implements OnInit {
  deviceItem$!: Observable<DeviceInterface>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService) {

    }

  ngOnInit(): void {
    this.deviceItem$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id')!;
        return this.deviceService.getDeviceById(id);
      }));
    }

  gotoList() {
    this.router.navigate(['/list-devices']);
  }  
}
