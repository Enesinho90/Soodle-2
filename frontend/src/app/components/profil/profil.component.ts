import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profil',
  imports: [RouterModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  constructor(private authService: AuthService) { }

  user: any;

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }
}
