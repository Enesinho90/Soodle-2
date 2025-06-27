import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user: any = this.authService.getCurrentUser(); // ici on suppose que c’est un objet direct, pas un Observable

    if (user && user.roles && user.roles.includes('ROLE_ADMIN')) {
      return true;
    }

    this.router.navigate(['/courses']);
    return false;
  }
}
