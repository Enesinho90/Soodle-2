import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../../services/forum.service';
import { AuthService } from '../../services/auth.service';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';


@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ForumPageComponent implements OnInit {
  forum: any;
  courseId!: number;
  newReplies: { [threadId: string]: string } = {};
  newThreadTitle = '';
  newThreadMessage = '';
  user: any;
  courseTitle = '';

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService,
    private authService: AuthService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.user = this.authService.getCurrentUser();
    // Récupère le titre du cours à partir du service
    const course: Course | undefined = this.courseService.getCourses().find(c => c.id === this.courseId);
    this.courseTitle = course ? course.intitule : '';
    this.loadForum();
  }

  loadForum(): void {
    this.forumService.getForum(this.courseId).subscribe({
      next: (data) => this.forum = data,
      error: (err) => console.error('Erreur chargement forum', err)
    });
  }

  sendReply(threadId: string): void {
    if (!this.user) return;
    const { id, nom, prenom, roles } = this.user;
    const content = this.newReplies[threadId]?.trim();
    if (!content) return;
    const message = { id, nom, prenom, roles, content };
    this.forumService.postMessage(this.courseId, threadId, message).subscribe({
      next: () => {
        this.newReplies[threadId] = '';
        this.loadForum();
      },
      error: (err) => console.error("Erreur envoi message", err)
    });
  }

  createThread(): void {
    if (!this.user) return;
    const { id, nom, prenom, roles } = this.user;
    const title = this.newThreadTitle.trim();
    const content = this.newThreadMessage.trim();
    if (!title || !content) return;
    const thread = {
      id,
      nom,
      prenom,
      roles,
      title,
      courseTitle: this.courseTitle,
      messages: [{ id, nom, prenom, roles, content }]
    };
    this.forumService.createThread(this.courseId, thread).subscribe({
      next: () => {
        this.newThreadTitle = '';
        this.newThreadMessage = '';
        this.loadForum();
      },
      error: (err) => console.error("Erreur création thread", err)
    });
  }
}