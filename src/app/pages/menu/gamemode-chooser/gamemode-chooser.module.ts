import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GamemodeChooserRoutingModule } from './gamemode-chooser-routing.module';
import { GamemodeChooserComponent } from './gamemode-chooser.component';

import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
   declarations: [
      GamemodeChooserComponent
   ],
   imports: [
      CommonModule,
      GamemodeChooserRoutingModule,
      MatButtonModule,
      TranslocoModule
   ]
})
export class GamemodeChooserModule { }
