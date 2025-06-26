import { Component } from '@angular/core';
import { CourseHeaderComponent } from "../../components/header/course-header.component";
import { PostTypeSelectorComponent } from "../../components/modification-creation/post-type-selector/post-type-selector.component";
import { PostFormComponent } from "../../components/modification-creation/post-form/post-form.component";

@Component({
  selector: 'app-page-creation-modification',
  imports: [CourseHeaderComponent, PostTypeSelectorComponent, PostFormComponent],
  templateUrl: './page-creation-modification.component.html',
  styleUrl: './page-creation-modification.component.css'
})
export class PageCreationModificationComponent {
  selectType : string = 'message';
  onTypeSelect(type : string) {
    this.selectType = type
  }
}
