import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from "../../components/contenue-ue/search-bar/search-bar.component";
import { ListPostComponent } from "../../components/contenue-ue/list-post/list-post.component";
import { CourseHeaderComponent } from "../../components/header/course-header.component";
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ue-content-page',
  imports: [RouterModule, SearchBarComponent, ListPostComponent, CourseHeaderComponent,CommonModule],
  templateUrl: './ue-content-page.component.html',
  styleUrl: './ue-content-page.component.css'
})
export class UeContentPageComponent implements OnInit{
  courseId!: string;
  user: User | null = null;
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    console.log(this.user?.roles)
  }



  constructor(private route: ActivatedRoute, private authService : AuthService ) {
    const param = this.route.snapshot.paramMap.get('id');
    if (param === null) {
      throw new Error('Paramètre de route "id" manquant');
    }
    this.courseId = param;
  }
}
