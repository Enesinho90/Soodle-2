import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  @Input() course!: Course;

  constructor(private router: Router) { }

  goToCourse(id: number) {
    this.router.navigate(['/courses', id]);
  }
}
