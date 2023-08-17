import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';

import { MatButtonModule } from '@angular/material/button';


@NgModule({
   declarations: [
      MenuComponent
   ],
   imports: [
      CommonModule,
      MenuRoutingModule,
      MatButtonModule,
   ]
})
export class MenuModule { }
