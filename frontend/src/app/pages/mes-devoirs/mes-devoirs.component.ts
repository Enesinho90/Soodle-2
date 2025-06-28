import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../services/assignment.service';
import { AuthService } from '../../services/auth.service';
import { AssignmentTemplate } from '../../models/assignment-template.model';
import { CommonModule } from '@angular/common';
import { UniteEnseignementService } from '../../services/unite-enseignement.service';

@Component({
  selector: 'app-mes-devoirs',
  templateUrl: './mes-devoirs.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrl :'./mes-devoirs.component.css'

})
export class MesDevoirsComponent implements OnInit {
  selectedFile: File | null = null;
  selectedTemplateId: string = '';
  assignments: any[] = [];
  assignmentTemplates: AssignmentTemplate[] = [];
  ueNames: { [id: string]: string } = {};


  constructor(
    private assignmentService: AssignmentService,
    private authService: AuthService,
    private ueService : UniteEnseignementService
  ) {}

 ngOnInit(): void {
  const studentId = String(this.authService.getCurrentId());

  // 🔹 Devoirs rendus par l'étudiant
  this.assignmentService.getAssignmentsByStudent(studentId).subscribe((data) => {
    this.assignments = data;
  });

  // 🔹 Templates des devoirs à faire
  this.assignmentService.getTemplatesByStudentId(studentId).subscribe((templates: AssignmentTemplate[]) => {
    this.assignmentTemplates = templates;

    // Pour chaque template, on récupère le nom de l'UE
    this.assignmentTemplates.forEach((template) => {
      const courseId = Number(template.courseId);

      if (courseId && !this.ueNames[courseId]) {
        this.ueService.getUeById(courseId).subscribe({
          next: (ue: any) => {
            this.ueNames[courseId] = `${ue.code}`; // si "nom" existe bien
          },
          error: (err) => {
            console.error(`Erreur lors du chargement de l'UE ${courseId}`, err);
          }
        });
      }
    });
  });
}



  onFileSelected(event: any, templateId: string): void {
    this.selectedFile = event.target.files[0];
    this.selectedTemplateId = templateId;
  }

  submitAssignment(): void {
    if (!this.selectedFile || !this.selectedTemplateId) return;

    const studentId = String(this.authService.getCurrentId());
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('studentId', studentId);
    formData.append('assignmentTemplateId', this.selectedTemplateId);

    this.assignmentService.uploadAssignment(formData).subscribe(() => {
      alert('Devoir envoyé !');
      this.selectedFile = null;
      this.selectedTemplateId = '';
      this.ngOnInit(); // Recharge la liste
    });
  }

  deleteAssignment(a: any) {
  if (confirm('Supprimer ce devoir ?')) {
    this.assignmentService.deleteAssignment(a._id).subscribe({
      next: () => {
        this.assignments = this.assignments.filter(ass => ass._id !== a._id);
        alert('Devoir supprimé.');
      },
      error: (err) => console.error('Erreur suppression', err)
    });
  }
}
deleteTemplate(templateId: string): void {
  if (!confirm("Tu es sûr de vouloir supprimer ce devoir ?")) return;

  this.assignmentService.deleteAssignmentTemplate(templateId).subscribe({
    next: () => {
      alert('Devoir supprimé');
      this.assignmentTemplates = this.assignmentTemplates.filter(t => t._id !== templateId);
    },
    error: (err) => {
      console.error('Erreur suppression template :', err);
    }
  });
}


}
