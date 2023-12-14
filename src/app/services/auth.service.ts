import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private ngFireAuth: AngularFireAuth) { }

  async registrarUsuario(email: string, password: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(email,password)
  }
  
  async loginUsuario(email:string,password:string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email,password)
  }

  async reiniciarPassword(email:string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }

  async cerrarSesion() {
    return await this.ngFireAuth.signOut()
  }

  async listarPerfil() {
    return await this.ngFireAuth.currentUser
  }
}
