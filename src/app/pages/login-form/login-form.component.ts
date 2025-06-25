import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(private router : Router){

  }

  loginForm = new FormGroup({
    email: new FormControl(''),
    mot_de_passe: new FormControl('')
  });

  allerAuDashboard() {
    this.router.navigate(['/courses'])
  }

}
