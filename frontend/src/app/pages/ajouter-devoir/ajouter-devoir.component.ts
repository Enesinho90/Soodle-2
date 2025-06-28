import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { AssignmentService } from '../../services/assignment.service';
import { AffectationService } from '../../services/affectation.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter-devoir',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajouter-devoir.component.html',
  styleUrls: ['./ajouter-devoir.component.css']
})
export class AjouterDevoirComponent implements OnInit {
  template = {
    title: '',
    instructions: '',
    courseId: '',
    dueDate: '',
    createdBy: ''
  };

  ues: any[] = [];

  constructor(
    private assignmentService: AssignmentService,
    private affectationService: AffectationService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  const profId = this.auth.getCurrentId();

  if (profId === null) {
    console.error("Erreur : identifiant enseignant non trouvé");
    return;
  }

  this.template.createdBy = profId.toString(); // ✅ conversion explicite en string

  this.affectationService.getUesByUserId(profId).subscribe({
    next: (data) => this.ues = data,
    error: (err) => console.error('Erreur lors du chargement des UE', err)
  });
}


  submit(): void {
    this.assignmentService.createAssignmentTemplate(this.template).subscribe({
      next: () => {
        alert('Devoir créé avec succès !');
        this.router.navigate(['/enseignant/devoirs']);
      },
      error: (err) => {
        console.error('Erreur création devoir :', err);
        alert('Erreur lors de la création');
      }
    });
  }
}
