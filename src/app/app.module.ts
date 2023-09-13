import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { UserInfoComponent } from './shared/components/user-info/user-info.component';
import { LocalDatabaseService } from './shared/services/local-database.service';

@NgModule({
   declarations: [
      AppComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
         enabled: !isDevMode(),
         // Register the ServiceWorker as soon as the application is stable
         // or after 30 seconds (whichever comes first).
         registrationStrategy: 'registerWhenStable:30000'
      }),
      AngularFireModule.initializeApp(environment.firebase),
      //provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
      UserInfoComponent
   ],
   bootstrap: [AppComponent]
})
export class AppModule {

   constructor(
      dbService: LocalDatabaseService
   ) {
      dbService.openDatabase();
   }
}
