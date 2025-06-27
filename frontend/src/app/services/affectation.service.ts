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
}
