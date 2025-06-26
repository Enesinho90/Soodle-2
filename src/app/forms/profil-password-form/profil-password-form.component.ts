import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  checkPasswords(): boolean {
    return this.new_pw1 === this.new_pw2;
  }


  onSubmit() {
    // Traitement du formulaire (affichage ou envoi)
    console.log({ old_password: this.old_pw, new_password: this.new_pw1 });
  }

}
