import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = 'http://localhost:3000/forums';

  constructor(private http: HttpClient) { }

  getForum(courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}`);
  }

  postMessage(courseId: number, threadId: string, message: any): Observable<any> {
    // On envoie id, nom, prenom, roles, content
    const { id, nom, prenom, roles, content } = message;
    return this.http.post(`${this.apiUrl}/${courseId}/threads/${threadId}/messages`, {
      id, nom, prenom, roles, content
    });
  }

  createThread(courseId: number, thread: any): Observable<any> {
    // On envoie id, nom, prenom, roles, title, courseTitle, messages
    const { id, nom, prenom, roles, title, courseTitle, messages } = thread;
    return this.http.post(`${this.apiUrl}/${courseId}/threads`, {
      id, nom, prenom, roles, title, courseTitle, messages
    });
  }
}
