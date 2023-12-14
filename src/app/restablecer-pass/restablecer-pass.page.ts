import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-restablecer-pass',
  templateUrl: './restablecer-pass.page.html',
  styleUrls: ['./restablecer-pass.page.scss'],
})
export class RestablecerPassPage implements OnInit {

  email:any

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

  user = {
    usuario: "",
}

  constructor(public toastController: ToastController, private router: Router,
    private el: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService) { }

  ngOnInit() {
    this.updateCurrentDateTime();
    setInterval(() => {
      this.updateCurrentDateTime();
      this.toggleColor();
    }, 1000); // Cambia cada 2 segundos (2000ms)
    this.obtenerDesdeLocalStorage();
  }

  async reestablecerPass() {
    this.authService.reiniciarPassword(this.email),
    console.log('Link enviado para reinicio')
    this.router.navigate(['/login']
    ).catch((error) =>{
      console.log(error);
    })
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

  mostrarMensaje() {

    if (this.validateModel(this.user)) {
      this.presentToast('Se ha enviado un correo para reestablecer su contraseña.');
      this.router.navigate(['/login']);
    } else {
      this.presentToast("Porfavor, rellene el campo vacio.");
    }
  }

  validateModel(model: any) {
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    for (var [field, value] of Object.entries(model)) {
      //verifico campo vacio
      if (value == "" || value == null || value == undefined || value == " ") {
        return false;
      }
      console.log(value);
    }
    return true;
  }
  async presentToast(msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 4000 //si no viene el parámetro el tiempo es 2000
    });
    toast.present();

  }
}
