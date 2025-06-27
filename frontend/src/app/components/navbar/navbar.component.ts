import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  constructor(private authService: AuthService) { }

  isProfileInformationsVisible = false;

  user: any;

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }


  togglePopup() {
    this.isProfileInformationsVisible = !this.isProfileInformationsVisible;
  }

  logout() {
    this.authService.logout();
    window.location.reload(); // ou tu peux router vers /login si tu préfères
  }
}
