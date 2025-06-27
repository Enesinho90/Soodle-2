import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UniteEnseignement {
    id: number;
    code: string;
    intitule: string;
    image: string;
}

@Injectable({
    providedIn: 'root'
})
export class UniteEnseignementService {
    private apiUrl = 'http://localhost:3000/api/ues';

    constructor(private http: HttpClient) { }

    getAllUes(): Observable<UniteEnseignement[]> {
        return this.http.get<UniteEnseignement[]>(this.apiUrl);
    }

    updateUe(ue: UniteEnseignement | FormData): Observable<UniteEnseignement> {
        return this.http.put<UniteEnseignement>(this.apiUrl + '/updateUe', ue);
    }

    deleteUe(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    createUe(ue: Omit<UniteEnseignement, 'id'> | FormData): Observable<UniteEnseignement> {
        return this.http.post<UniteEnseignement>(this.apiUrl, ue);
    }

    getUeById(id: number): Observable<UniteEnseignement> {
        return this.http.get<UniteEnseignement>(`${this.apiUrl}/${id}`);
    }
}
