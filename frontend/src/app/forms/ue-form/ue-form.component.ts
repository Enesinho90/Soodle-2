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

  constructor(private ueService: UniteEnseignementService, private router: Router) { }

  onSubmit() {
    this.ueService.createUe({ code: this.code, intitule: this.intitule, image: this.image }).subscribe({
      next: () => {
        this.successMessage = 'Unité d\'enseignement créée avec succès !';
        this.code = '';
        this.intitule = '';
        this.image = '';
        setTimeout(() => { this.successMessage = ''; }, 3000);
      },
      error: () => {
        alert('Erreur lors de la création de l\'UE');
      }
    });
  }

  updateImageName() {
    this.image = this.code ? this.code + '.png' : '';
  }

}
