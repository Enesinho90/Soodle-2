import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { AffectationService, Affectation } from '../../services/affectation.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UniteEnseignementService } from '../../services/unite-enseignement.service';

@Component({
  selector: 'app-affectation-ue-form',
  imports: [CommonModule],
  templateUrl: './affectation-ue-form.component.html',
  styleUrl: './affectation-ue-form.component.css'
})
export class AffectationUeFormComponent {
  user: any;
  userId: number = 0;
  coursesAvailable: any[] = [];
  uesAffectees: any[] = [];
  selectedUeId: number | null = null;
  actionMode: 'add' | 'delete' = 'add';
  buttonLabel: string = 'Ajouter';
  buttonClass: string = 'btn';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private affectationService: AffectationService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private ueService: UniteEnseignementService
  ) {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.authService.getUserById(this.userId).subscribe(user => this.user = user);
      // Récupérer les affectations de l'utilisateur

      // Récupérer les UE affectées à l'utilisateur
      this.affectationService.getUesByUserId(this.userId).subscribe(ues => {
        this.uesAffectees = ues;
      });
    });
  }

  ngOnInit() {
    this.ueService.getAllUes().subscribe(ues => {
      this.coursesAvailable = ues;
    });

  }

  onUeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedUeId = parseInt(value);
    const alreadyAffecte = this.uesAffectees.some(ue => ue.id === this.selectedUeId);
    if (alreadyAffecte) {
      this.actionMode = 'delete';
      this.buttonLabel = 'Supprimer';
      this.buttonClass = 'btn btn-danger';
    } else {
      this.actionMode = 'add';
      this.buttonLabel = 'Ajouter';
      this.buttonClass = 'btn';
    }
  }

  onSubmit(event?: Event) {
    if (event) event.preventDefault();
    this.errorMessage = null;
    if (!this.selectedUeId) return;
    if (this.actionMode === 'add') {
      this.affectationService.createAffectation(this.userId, this.selectedUeId).subscribe({
        next: () => {
          // Ajout local de l'UE suivie
          const ueAjoutee = this.coursesAvailable.find(ue => ue.id === this.selectedUeId);
          if (ueAjoutee && !this.uesAffectees.some(ue => ue.id === ueAjoutee.id)) {
            this.uesAffectees = [...this.uesAffectees, ueAjoutee];
          }
          // Mise à jour immédiate du bouton
          this.onUeChange({ target: { value: this.selectedUeId!.toString() } } as any);
          this.successMessage = 'Affectation ajoutée avec succès !';
          setTimeout(() => this.successMessage = null, 3000);
        },
        error: (err) => {
          this.errorMessage = err?.error?.error || 'Erreur lors de l\'ajout de l\'affectation.';
          setTimeout(() => this.errorMessage = null, 4000);
        }
      });
    } else if (this.actionMode === 'delete') {
      this.affectationService.deleteAffectation(this.userId, this.selectedUeId).subscribe({
        next: () => {
          // Suppression locale de l'UE suivie
          this.uesAffectees = this.uesAffectees.filter(ue => ue.id !== this.selectedUeId);
          // Mise à jour immédiate du bouton
          this.onUeChange({ target: { value: this.selectedUeId!.toString() } } as any);
          this.successMessage = 'Affectation supprimée avec succès !';
          setTimeout(() => this.successMessage = null, 2000);
        },
        error: (err) => {
          this.errorMessage = err?.error?.error || 'Erreur lors de la suppression de l\'affectation.';
          setTimeout(() => this.errorMessage = null, 2000);
        }
      });
    }
  }
}
