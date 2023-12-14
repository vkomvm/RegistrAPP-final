import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Barcode, BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router'


@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.page.html',
  styleUrls: ['./lector-qr.page.scss'],
})
export class LectorQrPage implements OnInit {

  public barcodes: Barcode[] = [];
  public async scan(): Promise<void> {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
    this.barcodes = barcodes;
  }

  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
      handler: () => {
        // Cuando el usuario confirma la alerta, navega a la página login.
        this.router.navigate(['login']);
      },
    },
  ];

  public currentDateTime: string = ''; // Inicializamos la propiedad con una cadena vacía

  public color1 = '#002138';
  public color2 = '#F8B31C';
  public currentColor = this.color1;

  isSupported = false;
  constructor( private alertController: AlertController, private router: Router, private el: ElementRef,
    private renderer: Renderer2, private toast: ToastController) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    this.updateCurrentDateTime();
    setInterval(() => {
      this.updateCurrentDateTime();
      this.toggleColor();
    }, 1000); // Cambia cada 2 segundos (2000ms)
    this.obtenerDesdeLocalStorage();
  } 

  updateCurrentDateTime() {
    const now = new Date();
    this.currentDateTime = this.formatDate(now);
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const monthNames = [
      'ene', 'feb', 'mar', 'abr', 'may', 'jun',
      'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${day} ${monthNames[monthIndex]} ${year} ${hours}:${minutes}:${seconds}`;
  }

  toggleColor() {
    const title = this.el.nativeElement.querySelector('titulocolor');

    if (this.currentColor === this.color1) {
      this.renderer.setStyle(title, 'color', this.color2);
      this.currentColor = this.color2;
    } else {
      this.renderer.setStyle(title, 'color', this.color1);
      this.currentColor = this.color1;
    }
  }

  datoRecuperado: string = '';
  obtenerDesdeLocalStorage() {
    const valorGuardado = localStorage.getItem('miDato');
    if (valorGuardado) {
      this.datoRecuperado = valorGuardado;
    }
  }


  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Por favor acepta el permiso para que la aplicación use la cámara',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
