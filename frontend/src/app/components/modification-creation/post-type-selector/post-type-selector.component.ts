import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-post-type-selector',
  imports: [],
  templateUrl: './post-type-selector.component.html',
  styleUrl: './post-type-selector.component.css'
})
export class PostTypeSelectorComponent {

  @Output() typeSelected = new EventEmitter<string>()
 
  select(type : string) {
    this.typeSelected.emit(type)
  }

}
