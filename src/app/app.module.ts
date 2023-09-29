import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { UserInfoComponent } from './shared/components/user-info/user-info.component';
import { AppInitializationUtils } from './shared/utils/app-initialization.utils';
import { AuthEffects } from './store/effects/auth.effects';
import { authReducer } from './store/reducers/auth.reducer';
import { coreReducer } from './store/reducers/core.reducer';

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
      UserInfoComponent,
      StoreModule.forRoot({
         core: coreReducer,
         auth: authReducer
      }, {}),
      EffectsModule.forRoot([
         AuthEffects
      ])
   ],
   bootstrap: [AppComponent],
   providers: [{
      provide: APP_INITIALIZER,
      deps: [Store],
      useFactory: (store: Store) => () => AppInitializationUtils.openDatabase(store),
      multi: true
   }]
})
export class AppModule { }
