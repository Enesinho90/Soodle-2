import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modify-user-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './modify-user-form.component.html',
  styleUrl: './modify-user-form.component.css'
})
export class ModifyUserFormComponent {
  nom: string = '';
  prenom: string = ''
  mail: string = '';
  role: string[] = [];

  onSubmit() {
    console.log({ nom: this.nom, prenom: this.prenom, mail: this.mail, role: this.role });
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
