import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LectorQrPageRoutingModule } from './lector-qr-routing.module';

import { LectorQrPage } from './lector-qr.page';
//Importamos la libreria para escanear los codigos qr con la camara, ionic
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LectorQrPageRoutingModule
  ],
  declarations: [LectorQrPage]
})
export class LectorQrPageModule {}
