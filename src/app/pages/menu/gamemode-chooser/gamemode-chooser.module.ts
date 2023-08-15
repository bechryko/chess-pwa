import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamemodeChooserRoutingModule } from './gamemode-chooser-routing.module';
import { GamemodeChooserComponent } from './gamemode-chooser.component';

import { MatButtonModule } from '@angular/material/button';
import { DirectivesModule } from 'src/app/shared/directives.module';


@NgModule({
   declarations: [
      GamemodeChooserComponent
   ],
   imports: [
      CommonModule,
      GamemodeChooserRoutingModule,
      MatButtonModule,
      DirectivesModule
   ]
})
export class GamemodeChooserModule { }
