import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UniteEnseignementService, UniteEnseignement } from '../../services/unite-enseignement.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modify-ue-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './modify-ue-form.component.html',
  styleUrl: './modify-ue-form.component.css'
})
export class ModifyUeFormComponent {
  id: number = 0;
  code: string = '';
  intitule: string = '';
  image: string = '';
  selectedFile: File | null = null;
  successMessage: string = '';

  constructor(
    private ueService: UniteEnseignementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.ueService.getAllUes().subscribe(ues => {
        const ue = ues.find(u => u.id === this.id);
        if (ue) {
          this.code = ue.code;
          this.intitule = ue.intitule;
          this.image = ue.image;
        }
      });
    });
  }

  onSubmit() {
    const ue: UniteEnseignement = {
      id: this.id,
      code: this.code,
      intitule: this.intitule,
      image: this.image
    };
    this.ueService.updateUe(ue).subscribe({
      next: () => {
        this.successMessage = 'Modification enregistrée avec succès !';
        setTimeout(() => { this.successMessage = ''; }, 3000);
      },
      error: err => alert('Erreur lors de la modification de l\'UE')
    });
  }

  updateImageName() {
    this.image = this.code ? this.code + '.png' : '';
  }

}
