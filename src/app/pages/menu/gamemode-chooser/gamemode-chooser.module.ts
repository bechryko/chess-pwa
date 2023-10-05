import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GamemodeChooserRoutingModule } from './gamemode-chooser-routing.module';
import { GamemodeChooserComponent } from './gamemode-chooser.component';

import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
   declarations: [
      GamemodeChooserComponent
   ],
   imports: [
      CommonModule,
      GamemodeChooserRoutingModule,
      MatButtonModule,
      TranslateModule
   ]
})
export class GamemodeChooserModule { }
