import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-admin-page',
  imports: [],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  isChoosingUsers: boolean = true;
  isChoosingCourses: boolean = false;
  userList: User[] = [];
  courseList: Course[] = []; // Assuming you will implement course list later

  constructor(private userService: UserService, private courseService: CourseService) {
    this.userList = this.userService.getUsers();
    this.courseList = this.courseService.getCourses(); // Initialize with an empty array or fetch from a service
  }

  swapDisplayToUsers() {
    this.isChoosingUsers = false;
    this.isChoosingCourses = true;
  }

  swapDisplayToCourses() {
    this.isChoosingCourses = false;
    this.isChoosingUsers = true;
  }

}
