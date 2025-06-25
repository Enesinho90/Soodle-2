import { Component } from '@angular/core';
import { CourseListComponent } from "../../components/course-list/course-list.component";
import { ActualitiesComponent } from "../../components/actualities/actualities.component";

@Component({
  selector: 'app-courses-page',
  imports: [CourseListComponent, ActualitiesComponent],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css'
})
export class CoursesPageComponent {

}
