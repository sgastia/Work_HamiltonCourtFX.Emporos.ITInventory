import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone:true,
  imports: [MatButtonModule, MatMenuModule],
})

export class MenuComponent {
  constructor(private router: Router) { }

  navigateMenu(tag: string) {
    if (tag === 'Employees') {
      this.router.navigate(['/list-employees']);
    }
    if (tag === 'Devices') {
      this.router.navigate(['/list-devices']);
    }
  }
}
