import { Component, Input, OnInit, Output,EventEmitter  } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post',
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  @Input() post: any
  @Output() postDeleted = new EventEmitter<void>();
 
  user: User | null = null;
  currrentUser : User | null = null;

  constructor(private authservice: AuthService, private postService: PostService) {
  }

  ngOnInit(): void {
    this.authservice.getUserById(this.post.utilisateur_id).subscribe(u => {
      this.user = u
    })
    this.currrentUser = this.authservice.getCurrentUser()
   
  }

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe({
      next: (response) => {
        console.log('Post supprimé avec succès', response);
        this.postDeleted.emit(); // Émettre seulement après succès
      },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err);
        // Optionnel : afficher un message d'erreur à l'utilisateur
      }
    });
  }
}