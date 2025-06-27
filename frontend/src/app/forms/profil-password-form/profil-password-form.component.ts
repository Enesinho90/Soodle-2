import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profil-password-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './profil-password-form.component.html',
  styleUrl: './profil-password-form.component.css'
})
export class ProfilPasswordFormComponent {
  old_pw: string = '';
  new_pw1: string = '';
  new_pw2: string = '';
  message: string = '';

  constructor(private authService: AuthService) { }

  checkPasswords(): boolean {
    return this.new_pw1 === this.new_pw2;
  }

  onSubmit() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.message = "Utilisateur non connecté.";
      return;
    }
    if (!this.checkPasswords()) {
      this.message = "Les mots de passe ne correspondent pas.";
      return;
    }
    this.authService.changePassword({
      id: user.id,
      oldPassword: this.old_pw,
      newPassword: this.new_pw1
    }).subscribe({
      next: (res: any) => this.message = res.message,
      error: err => this.message = err.error.message
    });
  }
}
