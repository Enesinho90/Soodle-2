import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CourseComponent } from './components/course/course.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { ActualitiesComponent } from "./components/actualities/actualities.component";
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CourseComponent, CourseListComponent, RouterModule, ActualitiesComponent, CoursesPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {

  constructor(private router : Router) {
    
  }

  title = 'Soodle';
  
  showNavBar() :boolean {
    if(this.router.url == '/login') {
      return false
    }
    return true
  }


   

}
