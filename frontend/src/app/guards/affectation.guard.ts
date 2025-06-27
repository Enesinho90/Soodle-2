import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AffectationService } from '../services/affectation.service';

@Injectable({
  providedIn: 'root'
})
export class AffectationGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private affectationService: AffectationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const ueId = Number(route.paramMap.get('id'));
    const user = this.authService.getCurrentUser();

    if (!user) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.affectationService.getAffectationsByUserId(user.id).pipe(
      map(affectations => {
        const estAffecte = affectations.some(a => a.unite_enseignement_id === ueId);
        if (!estAffecte) {
          this.router.navigate(['/courses']); // 🔁 redirection ici
        }
        return estAffecte;
      }),
      catchError(err => {
        console.error('Erreur dans le guard affectation :', err);
        this.router.navigate(['/courses']);
        return of(false);
      })
    );
  }
}
