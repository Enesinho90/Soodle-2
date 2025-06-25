import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseComponent } from './components/course/course.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

export const routes: Routes = [
    { path: 'courses', component: CoursesPageComponent },
    { path: '', redirectTo: 'courses', pathMatch: 'full' },
    { path: 'admin', component: AdminPageComponent },
    { path: 'profil', component: ProfilComponent },

    // ...autres routes
];