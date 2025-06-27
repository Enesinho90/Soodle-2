import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-user-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './modify-user-form.component.html',
  styleUrl: './modify-user-form.component.css'
})
export class ModifyUserFormComponent {
  nom: string = '';
  prenom: string = '';
  mail: string = '';
  role: string[] = [];
  message: string = '';
  id: number | null = null;
  selectedRole: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.authService.getAllUsers().subscribe({
        next: users => {
          const user = users.find((u: any) => u.id === this.id);
          if (user) {
            this.nom = user.nom;
            this.prenom = user.prenom;
            this.mail = user.email;
            this.role = user.roles;
            // Définir la valeur du select selon les rôles
            if (user.roles.includes('ROLE_ADMIN') && user.roles.includes('ROLE_PROFESSEUR')) {
              this.selectedRole = 'admin/prof';
            } else if (user.roles.includes('ROLE_ADMIN')) {
              this.selectedRole = 'admin';
            } else if (user.roles.includes('ROLE_PROFESSEUR')) {
              this.selectedRole = 'professeur';
            } else {
              this.selectedRole = 'etudiant';
            }
          }
        },
        error: () => {
          this.message = "Impossible de récupérer l'utilisateur.";
        }
      });
    }
  }

  onSubmit() {
    if (!this.id) {
      this.message = "ID utilisateur manquant.";
      return;
    }
    this.authService.updateProfileAdmin({
      id: this.id,
      nom: this.nom,
      prenom: this.prenom,
      email: this.mail,
      roles: this.role
    }).subscribe({
      next: (res: any) => this.message = res.message,
      error: err => this.message = err.error.message
    });
  }

  updateRole(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
    this.selectedRole = selected;
    this.role = [];
    if (selected === 'etudiant') {
      this.role = ['ROLE_ETUDIANT'];
    } else if (selected === 'professeur') {
      this.role = ['ROLE_PROFESSEUR'];
    } else if (selected === 'admin') {
      this.role = ['ROLE_ADMIN'];
    } else if (selected === 'admin/prof') {
      this.role = ['ROLE_ADMIN', 'ROLE_PROFESSEUR'];
    }
  }
}
