import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private logService: LogService) { }

  isProfileInformationsVisible = false;

  user: any;

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    console.log('[Navbar] ngOnInit, user:', this.user);
  }


  togglePopup() {
    this.isProfileInformationsVisible = !this.isProfileInformationsVisible;
  }

  logout() {
    console.log('[Navbar] logout() called');
    if (!this.user || !this.user.id) {
      console.error('[Navbar] user ou user.id non défini');
      this.authService.logout();
      window.location.reload();
      return;
    }
    this.logService.logLogout(this.user.id).subscribe({
      next: () => {
        console.log('✅ Log envoyé, redirection...');
        this.authService.logout();
        window.location.reload();
      },
      error: err => {
        console.error('❌ Log échoué, mais on redirige quand même', err);
        this.authService.logout();
        window.location.reload();
      }
    });
  }
}
