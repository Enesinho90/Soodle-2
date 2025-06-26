import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil-modification-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './profil-modification-form.component.html',
  styleUrl: './profil-modification-form.component.css'
})
export class ProfilModificationFormComponent {
  nom: string = '';
  prenom: string = '';
  mail: string = '';
  image: string = '';
  selectedFile: File | null = null;

  updateImageName() {
    this.image = this.nom ? 'avatar-' + this.nom : '';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit() {
    // Traitement du formulaire (affichage ou envoi)
    console.log({ nom: this.nom, prenom: this.prenom, mail: this.mail, image: this.image, file: this.selectedFile });
  }
}
