import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Language } from '@chess-enums';
import { TranslocoService } from '@ngneat/transloco';

@Component({
   selector: 'app-settings',
   templateUrl: './settings.component.html',
   styleUrls: ['./settings.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
   public readonly availableLanguages = Object.values(Language);
   public selectedLanguageIdx = this.availableLanguages.indexOf(this.transloco.getActiveLang() as Language);

   constructor(
      private location: Location,
      private transloco: TranslocoService
   ) { }

   public changeLanguage(idx: number): void {
      this.selectedLanguageIdx = idx;
      this.transloco.setActiveLang(this.availableLanguages[idx]);
   }

   public goBack(): void {
      this.location.back();
   }
}
