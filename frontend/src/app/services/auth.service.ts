import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        // On stocke le token en localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getCurrentId(): number | null {
    const user = this.getCurrentUser();
    return user && user.id ? user.id : null;
  }

  register(user: { email: string; password: string; nom: string; prenom: string; roles?: any; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  updateProfile(user: { id: number; nom: string; prenom: string; email: string } | FormData): Observable<any> {
    // Si c'est un FormData (upload image), on utilise PUT avec multipart
    if (user instanceof FormData) {
      return this.http.put(`${this.apiUrl}/profile`, user).pipe(
        tap((response: any) => {
          localStorage.setItem('user', JSON.stringify(response.user));
        })
      );
    } else {
      // Sinon, on fait comme avant
      return this.http.put(`${this.apiUrl}/profile`, user).pipe(
        tap((response: any) => {
          localStorage.setItem('user', JSON.stringify(response.user));
        })
      );
    }
  }

  changePassword(data: { id: number; oldPassword: string; newPassword: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/change-password`, data);
  }

  updateProfileAdmin(user: { id: number; nom: string; prenom: string; email: string; roles: any; } | FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-profil-admin`, user);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/user/${id}`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${id}`);
  }

  getUsersByCourseId(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl.replace('/auth', '/affectations')}/users-by-course/${courseId}`);
  }

  /**
   * Récupère tous les professeurs, admins et admin/professeurs affectés à un cours donné
   * @param courseId id du cours (unite_enseignement_id)
   */
  getAdminAndProfByCourseId(courseId: number): Observable<any[]> {
    // Correction de l'URL pour correspondre à la route backend
    return this.http.get<any[]>(`http://localhost:3000/api/affectations/users-by-course/${courseId}`);
  }

  /**
   * Récupère tous les utilisateurs ayant uniquement le rôle ROLE_USER affectés à un cours donné
   * @param courseId id du cours (unite_enseignement_id)
   */
  getEtudiantsByCourseId(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/affectations/etudiants-users-by-course/${courseId}`);
  }
}
