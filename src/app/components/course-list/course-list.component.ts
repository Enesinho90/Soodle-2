import { Course } from './../../models/course';
import { Component } from '@angular/core';
import { CourseComponent } from '../course/course.component';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  imports: [CourseComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  courseList: Course[] = [];

  constructor(private courseService: CourseService) {
    this.courseList = this.courseService.getCourses();
  }
}
