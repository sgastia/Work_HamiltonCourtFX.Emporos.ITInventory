import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu/menu.component";
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [],
  imports: [MenuComponent, HeaderComponent],
  exports: [MenuComponent, HeaderComponent] 
})
export class SharedModule { }
