import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { HomePageComponent } from './home-page/home-page.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { RoomSelectorComponent } from './room-selector/room-selector.component';
import { FormsModule } from '@angular/forms';
import { GameRoomComponent } from './game-room/game-room.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CardComponent,
    RoomSelectorComponent,
    GameRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideAnalytics(() => getAnalytics()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFirestoreModule,
  ],
  providers: [
    ScreenTrackingService,UserTrackingService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
