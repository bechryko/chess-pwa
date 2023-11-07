import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { UserInfoComponent } from '@chess-components/user-info/user-info.component';
import { AuthEffects } from '@chess-store/effects/auth.effects';
import { LeaderboardEffects } from '@chess-store/effects/leaderboard.effects';
import { authReducer } from '@chess-store/reducers/auth.reducer';
import { coreReducer } from '@chess-store/reducers/core.reducer';
import { leaderboardReducer } from '@chess-store/reducers/leaderboard.reducer';
import { AppInitializationUtils } from '@chess-utils';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { TranslocoRootModule } from './transloco-root.module';

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
         auth: authReducer,
         leaderboard: leaderboardReducer
      }, {}),
      EffectsModule.forRoot([
         AuthEffects,
         LeaderboardEffects
      ]),
      HttpClientModule,
      TranslocoRootModule
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
