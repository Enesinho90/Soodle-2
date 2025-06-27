import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-list-post',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './list-post.component.html',
  styleUrl: './list-post.component.css'
})
export class ListPostComponent implements OnInit {

  @Input() ueId!: number; // <-- tu reçois l'ID de l'UE ici
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    if (this.ueId) {
      this.loadPosts();
    }
  }

  loadPosts(): void {
    this.postService.getPostsByUE(this.ueId).subscribe({
      next: (data) => this.posts = data,
      error: (err) => console.error('Erreur chargement posts UE :', err)
    });
  }
}
