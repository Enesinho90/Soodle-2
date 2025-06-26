import { Component } from '@angular/core';
import { PostComponent } from "../post/post.component";

@Component({
  selector: 'app-list-post',
  imports: [PostComponent],
  templateUrl: './list-post.component.html',
  styleUrl: './list-post.component.css'
})
export class ListPostComponent {

}
