import { Component, OnInit } from '@angular/core';
import { DeviceInterface } from '../../../interfaces/device.interface';
import { DeviceService } from '../../../services/device.service';
import { Observable, filter, map, switchMap } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list-devices',
  templateUrl: './list-devices.component.html',
  styleUrls: ['./list-devices.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatTableModule,
  ]
})
export class ListDevicesComponent implements OnInit {
  devicesList$!: Observable<DeviceInterface[]>;
  devicesListToShow$!: Observable<DeviceInterface[]>;
  selectedId = 0;
  displayedColumns: string[] = ['deviceType', 'description', 'edit'];
  constructor(
    private devicesService: DeviceService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.devicesList$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = parseInt(params.get('id')!);
        return this.devicesService.getAllDevices();
      })
    );
    this.devicesListToShow$ = this.devicesList$;
  }

  filterResults(text: string) {
    if (!text) {
      this.devicesListToShow$ = this.devicesList$;
      return;
    }
    this.devicesListToShow$ = this.devicesList$.pipe(
      map(items => items.filter(item =>
        item.description.toLowerCase().includes(text.toLowerCase()) ||
        item.deviceType.toLowerCase().includes(text.toLowerCase()) 
        )
      ));
    
  }
}
