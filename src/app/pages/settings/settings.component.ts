import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
   selector: 'app-settings',
   templateUrl: './settings.component.html',
   styleUrls: ['./settings.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
   public readonly availableLanguages = [
      {
         name: "English",
         code: "en-US"
      },
      {
         name: "Hungarian",
         code: "hu-HU"
      }
   ];
   public selectedLanguageIdx = 0;

   constructor(
      private location: Location
   ) { }

   public goBack(): void {
      this.location.back();
   }
}
