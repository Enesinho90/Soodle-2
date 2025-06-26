import { routes } from './../../app.routes';
import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-header',
  imports: [],
  templateUrl: './course-header.component.html',
  styleUrl: './course-header.component.css'
})
export class CourseHeaderComponent implements OnInit {

  header_text = ""

  ngOnInit(): void {
    if (this.router.url.includes('/courses/') && this.router.url.includes('/post')) {
      this.header_text = "Modification / Creation UE"
    } else if (this.router.url.includes('/courses/') && this.router.url.includes('/participants')) {
      this.header_text = "Liste des participants"
    }
    else if (this.router.url.includes('/courses/')) {
      this.header_text = "WE4E - Web Développement"
    }
  }

  constructor(private router: Router) {
  }




}
