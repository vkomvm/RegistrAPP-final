import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Se importa la libreria para generar un código QR, 'angularx-qrcode'
import { QRCodeModule } from 'angularx-qrcode';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireAuthModule} from '@angular/fire/compat/auth'

import { HttpClientModule} from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage'
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, QRCodeModule, FormsModule, ReactiveFormsModule, HttpClientModule, AngularFireModule, AngularFireAuthModule, provideFirebaseApp(() => initializeApp({"projectId":"logonregistrapp","appId":"1:1095852614812:web:d7cbad1b8be62940ca3959","storageBucket":"logonregistrapp.appspot.com","apiKey":"AIzaSyCjw7eJZ7kMsr1Y70amWI9om4tPv9hxa7o","authDomain":"logonregistrapp.firebaseapp.com","messagingSenderId":"1095852614812","measurementId":"G-020NQX817Y"})), provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()), provideFirestore(() => getFirestore()), provideFunctions(() => getFunctions()), provideMessaging(() => getMessaging()), provideStorage(() => getStorage())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],

})
export class AppModule {}
