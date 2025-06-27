import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  loginForm = new FormGroup({
    email: new FormControl(''),
    mot_de_passe: new FormControl('')
  });

  allerAuDashboard() {
    const email = this.loginForm.value.email || '';
    const password = this.loginForm.value.mot_de_passe || '';

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/courses']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Identifiant ou mot de passe incorrect";
      }
    });
  }
}
