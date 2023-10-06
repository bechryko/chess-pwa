import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';

import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
   declarations: [
      MenuComponent
   ],
   imports: [
      CommonModule,
      MenuRoutingModule,
      MatButtonModule,
      TranslocoModule
   ]
})
export class MenuModule { }
