import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from '../../core/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async onLogin() {
    this.loading = true;
    try {
      await this.auth.login(this.email, this.password);
      this.showToast('Login exitoso');
      this.router.navigate(['/home']);
    } catch (e: any) {
      this.showToast('Error al iniciar sesión: ' + e.message);
    } finally {
      this.loading = false;
    }
  }

  async onRegister() {
    this.loading = true;
    try {
      await this.auth.register(this.email, this.password);
      this.showToast('Usuario registrado correctamente');
      // Opcional: iniciar sesión automáticamente después de registrar
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (e: any) {
      this.showToast('Error al registrar: ' + e.message);
    } finally {
      this.loading = false;
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
