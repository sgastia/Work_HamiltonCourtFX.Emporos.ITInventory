import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu/menu.component";
import { HeaderComponent } from './header/header.component';
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [],
  imports: [MenuComponent, HeaderComponent, RouterModule],
  exports: [MenuComponent, HeaderComponent] 
})
export class SharedModule { }
