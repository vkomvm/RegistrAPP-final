import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-docente',
  templateUrl: './login-docente.page.html',
  styleUrls: ['./login-docente.page.scss'],
})
export class LoginDocentePage implements OnInit {

  formularioLoginDoc: FormGroup

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

  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.updateCurrentDateTime();
    setInterval(() => {
      this.updateCurrentDateTime();
      this.toggleColor();
    }, 1000); // Cambia cada 2 segundos (2000ms)
    this.obtenerDesdeLocalStorage();
    this.formularioLoginDoc =  this.formBuilder.group({
      email:['', [
        Validators.required,
        Validators.email
      ]],
      password:['', [
        Validators.required,

      ]]
    })
  }

  get errorControl() {
    return this.formularioLoginDoc.controls;
  }

  async LogOn() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.formularioLoginDoc?.valid){
      const user = await this.authService.loginUsuario(this.formularioLoginDoc.value.email,this.formularioLoginDoc.value.password).then(()=>{

      })
      
    }
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

  menudocente() {
    this.router.navigate(['/menu-docente'])
  }

  restablecerpass() {
    this.router.navigate(['/restablecer-pass'])
  }
}
