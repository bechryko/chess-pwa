import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule, isDevMode } from '@angular/core';
import {
   TRANSLOCO_CONFIG,
   TRANSLOCO_LOADER,
   Translation,
   TranslocoLoader,
   TranslocoModule,
   translocoConfig
} from '@ngneat/transloco';
import { Languages } from './shared/enums/languages';


@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
   constructor(private http: HttpClient) { }

   getTranslation(lang: string) {
      return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
   }
}

@NgModule({
   exports: [TranslocoModule],
   providers: [
      {
         provide: TRANSLOCO_CONFIG,
         useValue: translocoConfig({
            availableLangs: Object.values(Languages),
            defaultLang: Languages.ENGLISH,
            // Remove this option if your application doesn't support changing language in runtime.
            reRenderOnLangChange: true,
            prodMode: !isDevMode(),
         })
      },
      { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
   ]
})
export class TranslocoRootModule { }
