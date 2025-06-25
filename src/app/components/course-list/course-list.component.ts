import { Course } from './../../models/course';
import { Component, Input } from '@angular/core';
import { CourseComponent } from '../course/course.component';
@Component({
  selector: 'app-course-list',
  imports: [CourseComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  @Input() courseList: Course[] = [];

}
