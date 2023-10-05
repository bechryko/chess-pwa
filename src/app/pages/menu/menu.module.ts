import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';

import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
   declarations: [
      MenuComponent
   ],
   imports: [
      CommonModule,
      MenuRoutingModule,
      MatButtonModule,
      TranslateModule
   ]
})
export class MenuModule { }
