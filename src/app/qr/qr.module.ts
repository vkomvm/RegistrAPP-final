import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrPageRoutingModule } from './qr-routing.module';

import { QrPage } from './qr.page';
import { QRCodeModule } from 'angularx-qrcode';
//libreria de qr ionic con versión deprecada para ionic 7, se reemplaza con libreria angularx-qrcode 16

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrPageRoutingModule,
    QRCodeModule
  ],
  declarations: [QrPage]
})
export class QrPageModule {}
