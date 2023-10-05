import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

import { MatButtonModule } from '@angular/material/button';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';


@NgModule({
   declarations: [
      SettingsComponent
   ],
   imports: [
      CommonModule,
      SettingsRoutingModule,
      MatChipsModule,
      MatButtonModule
   ]
})
export class SettingsModule { }
