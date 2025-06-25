import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CourseComponent } from './components/course/course.component';
import { Course } from './models/course';
import { CourseListComponent } from './components/course-list/course-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CourseComponent, CourseListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Soodle';

  cours1: Course = {
    id: 1,
    code: 'WE4B',
    intitule: 'Technologies du Web, Angular',
    imageUrl: 'course-pic-1.jpg'
  };

  cours2: Course = {
    id: 2,
    code: 'SI40',
    intitule: 'Systèmes d’Information et Bases de Données',
    imageUrl: 'course-pic-2.jpg'
  };

  cours3: Course = {
    id: 3,
    code: 'RS40',
    intitule: 'Réseaux et Sécurité',
    imageUrl: 'course-pic-3.png'
  };

  cours4: Course = {
    id: 4,
    code: 'AP4A',
    intitule: 'Programmation Objet avec C++',
    imageUrl: 'course-pic-4.gif'
  };

  cours5: Course = {
    id: 5,
    code: 'WE4A',
    intitule: 'Développement Web Full Stack',
    imageUrl: 'course-pic-5.gif'
  };

  courses: Course[] = [
    this.cours1,
    this.cours2,
    this.cours3,
    this.cours4,
    this.cours5
  ];
}
