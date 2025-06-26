import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from "../../components/contenue-ue/search-bar/search-bar.component";
import { PostComponent } from "../../components/contenue-ue/post/post.component";
import { ListPostComponent } from "../../components/contenue-ue/list-post/list-post.component";
import { CourseHeaderComponent } from "../../components/header/course-header.component";

@Component({
  selector: 'app-ue-content-page',
  imports: [RouterModule, SearchBarComponent, PostComponent, ListPostComponent, CourseHeaderComponent],
  templateUrl: './ue-content-page.component.html',
  styleUrl: './ue-content-page.component.css'
})
export class UeContentPageComponent {
  courseId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.courseId = this.route.snapshot.paramMap.get('id');
  }
}
