import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ue-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './ue-form.component.html',
  styleUrl: './ue-form.component.css'
})
export class UeFormComponent {
  code: string = '';
  intitule: string = '';
  image: string = '';
  selectedFile: File | null = null;

  onSubmit() {
    console.log({ code: this.code, intitule: this.intitule, image: this.image });
  }

  updateImageName() {
    this.image = this.code ? this.code + '-background' : '';
  }

}
