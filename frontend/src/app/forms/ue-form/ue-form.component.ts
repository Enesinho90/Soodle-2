import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UniteEnseignementService } from '../../services/unite-enseignement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ue-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './ue-form.component.html',
  styleUrl: './ue-form.component.css'
})
export class UeFormComponent {
  code: string = '';
  intitule: string = '';
  image: string = '';
  selectedFile: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private ueService: UniteEnseignementService, private router: Router) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.errorMessage = '';
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit() {
    if (!this.selectedFile) {
      this.errorMessage = 'Veuillez sélectionner une image.';
      return;
    }
    // Récupérer l'extension du fichier
    const fileName = this.selectedFile.name;
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    const imageName = `${this.code}.${extension}`;

    const formData = new FormData();
    formData.append('code', this.code);
    formData.append('intitule', this.intitule);
    formData.append('image', this.selectedFile);
    formData.append('imageName', imageName); // On envoie le nom souhaité au backend

    this.ueService.createUe(formData).subscribe({
      next: () => {
        this.successMessage = "Unité d'enseignement créée avec succès !";
        this.code = '';
        this.intitule = '';
        this.image = '';
        this.selectedFile = null;
        setTimeout(() => { this.successMessage = ''; }, 3000);
      },
      error: () => {
        alert("Erreur lors de la création de l'UE");
      }
    });
  }

  updateImageName() {
    this.image = this.code ? this.code + '.png' : '';
  }

}
