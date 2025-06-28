import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssignmentTemplate } from '../models/assignment-template.model'; 

@Injectable({
  providedIn: 'root'
})
export class AssignmentTemplateService {
  private apiUrl = 'http://localhost:3000/api/assignment-templates';

  constructor(private http: HttpClient) {}

  getTemplatesByStudentId(userId: number): Observable<AssignmentTemplate[]> {
    return this.http.get<AssignmentTemplate[]>(`${this.apiUrl}/student/${userId}`);
  }
}
