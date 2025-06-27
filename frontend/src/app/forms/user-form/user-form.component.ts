import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  nom: string = '';
  prenom: string = '';
  mail: string = '';
  password: string = '';
  role: string[] = [];
  message: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    const user = {
      email: this.mail,
      password: this.password,
      nom: this.nom,
      prenom: this.prenom,
      roles: this.role
    };
    this.authService.register(user).subscribe({
      next: (res: any) => this.message = res.message,
      error: err => this.message = err.error.message
    });
  }

  updateRole(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
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
