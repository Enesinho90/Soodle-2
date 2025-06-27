import { AffectationService } from './../../services/affectation.service';
import { Course } from './../../models/course';
import { Component, OnInit } from '@angular/core';
import { CourseComponent } from '../course/course.component';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-course-list',
  imports: [CourseComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  userId = 0;
  courseList: Course[] = [];

  constructor(private authService: AuthService, private affectationService: AffectationService) {
    const currentUser = this.authService.getCurrentUser();
    this.userId = typeof currentUser === 'object' && currentUser !== null ? currentUser.id : currentUser;
  }

  ngOnInit() {
    this.affectationService.getUesByUserId(this.userId).subscribe(ues => {
      this.courseList = ues;
      console.log('Affectations récupérées :', this.courseList);
    });
  }
}
