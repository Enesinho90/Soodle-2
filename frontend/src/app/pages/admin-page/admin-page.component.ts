import { UniteEnseignementService } from './../../services/unite-enseignement.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  isChoosingUsers: boolean = true;
  isChoosingCourses: boolean = false;
  userList: any[] = [];
  courseList: any[] = [];
  showDeletePopup: boolean = false;
  userToDelete: any = null;
  showDeleteUePopup: boolean = false;
  ueToDelete: any = null;

  constructor(private authService: AuthService, private UniteEnseignementService: UniteEnseignementService, private router: Router) { }

  ngOnInit() {
    this.authService.getAllUsers().subscribe({
      next: users => this.userList = users,
      error: err => this.userList = []
    });
    this.UniteEnseignementService.getAllUes().subscribe({
      next: ues => this.courseList = ues,
      error: err => this.courseList = []
    });
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
    this.router.navigate([`/admin/affectations/${id}`]);
  }

  goToModifyUser(id: number) {
    this.router.navigate([`/admin/modify_user/${id}`]);
  }

  goToModifyUe(id: number) {
    this.router.navigate([`/admin/modify_ue/${id}`]);
  }

  openDeletePopup(user: any) {
    this.userToDelete = user;
    this.showDeletePopup = true;
  }

  closeDeletePopup() {
    this.showDeletePopup = false;
    this.userToDelete = null;
  }

  confirmDeleteUser() {
    if (!this.userToDelete) return;
    this.authService.deleteUser(this.userToDelete.id).subscribe({
      next: () => {
        this.userList = this.userList.filter(u => u.id !== this.userToDelete.id);
        this.closeDeletePopup();
      },
      error: () => {
        this.closeDeletePopup();
      }
    });
  }

  openDeleteUePopup(ue: any) {
    this.ueToDelete = ue;
    this.showDeleteUePopup = true;
  }

  closeDeleteUePopup() {
    this.showDeleteUePopup = false;
    this.ueToDelete = null;
  }

  confirmDeleteUe() {
    if (!this.ueToDelete) return;
    this.UniteEnseignementService.deleteUe(this.ueToDelete.id).subscribe({
      next: () => {
        this.courseList = this.courseList.filter(c => c.id !== this.ueToDelete.id);
        this.closeDeleteUePopup();
      },
      error: () => {
        this.closeDeleteUePopup();
      }
    });
  }

}
