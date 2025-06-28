import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user: any = this.authService.getCurrentUser(); // on suppose que c’est un objet direct

    if (user && user.roles && user.roles.includes('ROLE_PROFESSEUR')) {
      return true;
    }

    this.router.navigate(['/courses']);
    return false;
  }
}
