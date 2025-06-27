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

  @Input() ueUid!: string;     // <-- string reçu en input
  ueId!: number;               // <-- conversion en number
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.ueId = parseInt(this.ueUid, 10); // conversion string -> number
    if (!isNaN(this.ueId)) {
      this.loadPosts();
    } else {
      console.error('UID non valide :', this.ueUid);
    }
  }

  loadPosts(): void {
    this.postService.getPostsByUE(this.ueId).subscribe({
      next: (data) => this.posts = data,
      error: (err) => console.error('Erreur chargement posts UE :', err)
    });
  }
}
