import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

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
    private fb: FormBuilder,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) { 
    this.formularioRegistro = this.fb.group({
      "correo": new FormControl("", Validators.required),
      "password": new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.updateCurrentDateTime();
    setInterval(() => {
      this.updateCurrentDateTime();
      this.toggleColor();
    }, 1000); // Cambia cada 2 segundos (2000ms)
    this.obtenerDesdeLocalStorage();
    this.formularioRegistro = this.formBuilder.group({
      email:['',[Validators.required, Validators.email, Validators.minLength(6)]],
      password:['',[Validators.required, Validators.minLength(6)]]
    })
  }

  get errorControl() {
    return this.formularioRegistro?.controls;
  }

  async registro(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.formularioRegistro?.valid){
      const user = await this.authService.registrarUsuario(this.formularioRegistro.value.email,this.formularioRegistro.value.password).then(()=>{
        
      }).catch((error) =>{
        console.log(error);
        loading.dismiss()
      })

      //if(user){
        loading.dismiss()
        this.router.navigate(['/login'])
      }else{
        console.log
      }loading.dismiss()
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

}
