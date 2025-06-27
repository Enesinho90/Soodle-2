import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // Ne pas inclure "/posts" ici
  private apiUrl = 'http://localhost:3000/api'; // ✅ correction



  constructor(private http : HttpClient) { }

   addPost(postData: FormData): Observable<any> {
  // Ne pas définir Content-Type, Angular le fait automatiquement avec FormData
  return this.http.post(`${this.apiUrl}/posts`, postData);
  }

  getPostsByUE(ueId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts/ue/${ueId}`);
  }
  deletePost(idPost: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/posts/${idPost}`);
  }


}
