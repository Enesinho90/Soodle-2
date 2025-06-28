import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../models/course';
import { LogService } from '../../services/log.service';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  @Input() course!: Course;

  constructor(private router: Router, private logService: LogService) { }

  goToCourse(id: number) {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = currentUser.id;
    const courseTitle = this.course.intitule;
    this.logService.logViewCourse(userId, id, courseTitle).subscribe({
      next: () => {
        console.log("Log envoyé, redirection...");
        this.router.navigate(['/courses', id]);
      },
      error: err => {
        console.error(" Log échoué, mais on redirige quand même", err);
        this.router.navigate(['/courses', id]); // on redirige même si le log échoue
      }
    });
  }
}
