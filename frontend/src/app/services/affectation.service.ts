import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Affectation {
    id: number;
    utilisateur_id: number;
    unite_enseignement_id: number;
    date_inscription: string;
}

@Injectable({
    providedIn: 'root'
})
export class AffectationService {
    private apiUrl = 'http://localhost:3000/api/affectations';

    constructor(private http: HttpClient) { }

    getAllAffectations(): Observable<Affectation[]> {
        return this.http.get<Affectation[]>(this.apiUrl);
    }

    getAffectationsByUserId(userId: number): Observable<Affectation[]> {
        return this.http.get<Affectation[]>(`${this.apiUrl}/user/${userId}`);
    }

    getUesByUserId(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/user/${userId}/ues`);
    }

    createAffectation(utilisateur_id: number, unite_enseignement_id: number): Observable<Affectation> {
        return this.http.post<Affectation>(this.apiUrl, { utilisateur_id, unite_enseignement_id });
    }

    deleteAffectation(utilisateur_id: number, unite_enseignement_id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${utilisateur_id}/${unite_enseignement_id}`);
    }
}
