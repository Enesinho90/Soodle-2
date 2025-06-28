import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://localhost:3000/logs'
  constructor(private http: HttpClient) { }

  logViewCourse(userId: number, courseId: number, courseTitle: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/view-course`, {
      userId,
      courseId,
      courseTitle
    });
  }

  logLogout(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, { userId });
  }
}
