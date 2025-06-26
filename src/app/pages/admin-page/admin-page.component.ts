import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';


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

  constructor(private userService: UserService, private courseService: CourseService, private router: Router) {
    this.userList = this.userService.getUsers();
    this.courseList = this.courseService.getCourses(); // Initialize with an empty array or fetch from a service
  }

  swapDisplayToCourses() {
    this.isChoosingUsers = false;
    this.isChoosingCourses = true;
  }

  swapDisplayToUsers() {
    this.isChoosingCourses = false;
    this.isChoosingUsers = true;
  }

  onAdd() {
    if (this.isChoosingUsers) {
      this.router.navigate(['/admin/add_user']);
    } else {
      this.router.navigate(['/admin/add_ue']);
    }
  }

  goToAffectations(id: number) {
    this.router.navigate(['/admin/affectations', id]);
  }

  goToModifyUser(id: number) {
    this.router.navigate(['/admin/modify_user', id]);
  }
  goToModifyUe(id: number) {
    this.router.navigate(['/admin/modify_ue', id]);
  }
}
