import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamemodeChooserRoutingModule } from './gamemode-chooser-routing.module';
import { GamemodeChooserComponent } from './gamemode-chooser.component';

import { MatButtonModule } from '@angular/material/button';
import { LoggedOffDirective } from 'src/app/shared/logged-off.directive';


@NgModule({
   declarations: [
      GamemodeChooserComponent
   ],
   imports: [
      CommonModule,
      GamemodeChooserRoutingModule,
      MatButtonModule,
      LoggedOffDirective
   ]
})
export class GamemodeChooserModule { }
