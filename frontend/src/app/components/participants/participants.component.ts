import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseHeaderComponent } from '../header/course-header.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UniteEnseignementService, UniteEnseignement } from '../../services/unite-enseignement.service';

@Component({
  selector: 'app-participants',
  imports: [CourseHeaderComponent, CommonModule],
  templateUrl: './participants.component.html',
  styleUrl: './participants.component.css',
  providers: [UniteEnseignementService]
})
export class ParticipantsComponent implements OnInit {
  profs: any[] = [];
  etudiants: any[] = [];
  courseId: number | null = null;
  cours: UniteEnseignement | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private uniteEnseignementService: UniteEnseignementService
  ) { }

  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.courseId) {
      this.authService.getAdminAndProfByCourseId(this.courseId).subscribe({
        next: users => {
          this.profs = users;
          console.log('profs:', this.profs);
        },
        error: () => {
          this.profs = [];
          console.log('Erreur lors de la récupération des profs');
        }
      });
      this.authService.getEtudiantsByCourseId(this.courseId).subscribe({
        next: etudiants => {
          this.etudiants = etudiants;
          console.log('etudiants:', this.etudiants);
        },
        error: () => {
          this.etudiants = [];
          console.log('Erreur lors de la récupération des étudiants');
        }
      });
      this.uniteEnseignementService.getUeById(this.courseId).subscribe({
        next: ue => {
          this.cours = ue;
          console.log('cours:', this.cours);
        },
        error: () => {
          this.cours = null;
          console.log('Erreur lors de la récupération de l\'UE');
        }
      });
    }

  }
}
