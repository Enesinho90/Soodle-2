import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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
  message: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.nom = user.nom;
      this.prenom = user.prenom;
      this.mail = user.email;
    }
  }

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
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.message = "Utilisateur non connecté.";
      return;
    }
    this.authService.updateProfile({
      id: user.id,
      nom: this.nom,
      prenom: this.prenom,
      email: this.mail
    }).subscribe({
      next: (res: any) => this.message = res.message,
      error: err => this.message = err.error.message
    });
  }
}
