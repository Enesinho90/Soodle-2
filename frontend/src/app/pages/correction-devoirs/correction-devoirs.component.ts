import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssignmentService } from '../../services/assignment.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-correction-devoirs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './correction-devoirs.component.html',
  styleUrl : './correction-devoirs.component.css'
})
export class CorrectionDevoirsComponent implements OnInit {
  /** Devoirs à corriger */
  assignments: any[] = [];

  /** Note tapée par devoir (id → score) */
  note: Record<string, number> = {};

  /** Commentaire tapé par devoir (id → comment) */
  comment: Record<string, string> = {};

  constructor(
    private assignmentService: AssignmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const teacherId = String(this.authService.getCurrentId());

    this.assignmentService
      .getAssignmentsByTeacherId(teacherId)
      .subscribe({
        next: (data) => (this.assignments = data),
        error: (err: any) => console.error('Erreur récupération devoirs', err)
      });
  }

  /** Envoie la note + commentaire pour un devoir donné */
  corriger(a: any): void {
    const score = this.note[a._id];
    const comment = this.comment[a._id] ?? '';

    if (score == null) {
      alert('Note obligatoire');
      return;
    }

    this.assignmentService
      .updateAssignmentGrade(a._id, score, comment)
      .subscribe({
        next: () => {
          alert('Devoir corrigé ✔');
          // Mise à jour locale de l’UI
          a.status = 'corrigé';
          a.grade = { score, comment, date: new Date() };
        },
        error: (err: any) => console.error('Erreur correction', err)
      });
  }
}
