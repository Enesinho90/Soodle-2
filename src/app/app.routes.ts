import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { ProfilModificationFormComponent } from './components/profil-modification-form/profil-modification-form.component';
import { ProfilPasswordFormComponent } from './components/profil-password-form/profil-password-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
    { path: 'courses', component: CoursesPageComponent },
    { path: '', redirectTo: 'courses', pathMatch: 'full' },
    { path: 'admin', component: AdminPageComponent },
    { path: 'profil', component: ProfilComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'profil/modifiy', component: ProfilModificationFormComponent },
    { path: 'profil/change_password', component: ProfilPasswordFormComponent },
    { path: 'admin/add_user', component: UserFormComponent },
    { path: 'admin/add_ue', component: UserFormComponent },


    // ...autres routes
];