import { Component } from '@angular/core';

@Component({
  selector: 'app-actualities',
  imports: [],
  templateUrl: './actualities.component.html',
  styleUrl: './actualities.component.css'
})
export class ActualitiesComponent {

  isClicked: boolean = false;
  clickCounter: number = 0;

  toggleClick() {
    this.isClicked = !this.isClicked;
    this.clickCounter++;
  }

}
