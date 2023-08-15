import { NgModule } from '@angular/core';
import { LoggedOffDirective } from './logged-off.directive';
@NgModule({
   declarations: [LoggedOffDirective],
   exports: [LoggedOffDirective],
})
export class DirectivesModule { }
