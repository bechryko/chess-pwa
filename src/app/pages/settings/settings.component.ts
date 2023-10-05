import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from 'src/app/shared/enums/languages';

@Component({
   selector: 'app-settings',
   templateUrl: './settings.component.html',
   styleUrls: ['./settings.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {
   public readonly availableLanguages = Object.values(Languages);
   public selectedLanguageIdx = this.availableLanguages.indexOf(this.translate.currentLang as Languages);

   constructor(
      private location: Location,
      private translate: TranslateService
   ) { }

   public changeLanguage(idx: number): void {
      this.selectedLanguageIdx = idx;
      this.translate.use(this.availableLanguages[idx]);
   }

   public goBack(): void {
      this.location.back();
   }
}
