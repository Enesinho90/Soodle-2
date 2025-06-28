import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private apiUrl = 'http://localhost:3000/api/assignments';

  constructor(private http: HttpClient) {}

  uploadAssignment(data: FormData) {
    return this.http.post(this.apiUrl, data);
  }

  getAllAssignmentTemplates() {
  return this.http.get<any[]>('http://localhost:3000/api/assignment-templates');
}
getAssignmentsByStudent(studentId: string) {
  return this.http.get<any[]>(`${this.apiUrl}?studentId=${studentId}`);
}

getTemplatesByStudentId(studentId: string) {
  return this.http.get<any[]>(`http://localhost:3000/api/assignment-templates/student/${studentId}`);
}

getAllAssignments() {
  return this.http.get<any[]>(this.apiUrl); // appelle GET http://localhost:3000/api/assignments
}
createAssignmentTemplate(template: any) {
  return this.http.post<any>('http://localhost:3000/api/assignment-templates', template);
}

getAssignmentsByTeacherId(teacherId: string) {
  return this.http.get<any[]>(`http://localhost:3000/api/assignments/teacher/${teacherId}`);
}
/** Met à jour la note & le commentaire d’un devoir */
updateAssignmentGrade(assignmentId: string, score: number, comment: string) {
  return this.http.patch<any>(
    `http://localhost:3000/api/assignments/${assignmentId}`,
    { score, comment }
  );
}


deleteAssignment(id: string) {
  return this.http.delete(`http://localhost:3000/api/assignments/${id}`);
}

deleteAssignmentTemplate(templateId: string) {
  return this.http.delete(`http://localhost:3000/api/assignment-templates/${templateId}`);
}


}
