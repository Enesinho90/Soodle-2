import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { AffectationService, Affectation } from '../../services/affectation.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-affectation-ue-form',
  imports: [CommonModule],
  templateUrl: './affectation-ue-form.component.html',
  styleUrl: './affectation-ue-form.component.css'
})
export class AffectationUeFormComponent {
  affectations: Affectation[] = [];
  user: any;
  userId: number = 0;

  constructor(
    private affectationService: AffectationService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      // Ici, tu peux appeler un service pour récupérer l'utilisateur par son id si besoin
      this.authService.getUserById(this.userId).subscribe(user => this.user = user);
    });
    this.affectationService.getAllAffectations().subscribe(affs => {
      this.affectations = affs;
    });
  }
}
