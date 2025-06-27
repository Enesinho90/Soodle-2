import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-header',
  imports: [CommonModule],
  templateUrl: './course-header.component.html',
  styleUrl: './course-header.component.css'
})
export class CourseHeaderComponent implements OnInit {

  header_text = ""
  courseId: string | null = null;
  showBackButton = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // Récupérer l'ID du cours
    this.getCourseIdFromUrl();
    
    // Définir le texte et la visibilité du bouton retour
    if (this.router.url.includes('/courses/') && this.router.url.includes('/post')) {
      this.header_text = "Modification / Creation UE"
      this.showBackButton = true;
    } else if (this.router.url.includes('/courses/') && this.router.url.includes('/participants')) {
      this.header_text = "Liste des participants"
      this.showBackButton = true;
    }
    else if (this.router.url.includes('/courses/')) {
      this.header_text = "WE4E - Web Développement"
      this.showBackButton = false;
    }
  }

  getCourseIdFromUrl(): void {
    // Extraire l'ID depuis l'URL avec une regex
    const urlPattern = /\/courses\/(\d+)/;
    const match = this.router.url.match(urlPattern);
    
    if (match && match[1]) {
      this.courseId = match[1];
    }
  }

  goBack(): void {
    if (this.courseId) {
      this.router.navigate(['/courses', this.courseId]);
    }
  }

  goToCourses(): void {
    this.router.navigate(['/courses']);
  }
}