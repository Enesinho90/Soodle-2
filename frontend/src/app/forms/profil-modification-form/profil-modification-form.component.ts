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
  id: number | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.id = user.id;
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
    if (this.selectedFile) {
      const fileName = this.selectedFile.name;
      const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
      const avatarName = `avatar_${this.id}.${extension}`;
      const formData = new FormData();
      formData.append('id', user.id.toString());
      formData.append('nom', this.nom);
      formData.append('prenom', this.prenom);
      formData.append('mail', this.mail);
      formData.append('avatar', this.selectedFile, avatarName);
      this.authService.updateProfile(formData).subscribe({
        next: (res: any) => {
          this.message = res.message;
          this.selectedFile = null;
          setTimeout(() => { this.message = ''; }, 3000);
        },
        error: err => {
          this.message = err.error.message;
          setTimeout(() => { this.message = ''; }, 3000);
        }
      });
    } else {
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
}
