import { Component } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {

  postForm = new FormGroup({
    titre : new FormControl(''),
    fichier: new FormControl(null),
    contenu: new FormControl('')
  })

}
