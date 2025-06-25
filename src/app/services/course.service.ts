import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private courses: Course[] = [
        {
            id: 1,
            code: 'WE4B',
            intitule: 'Technologies du Web, Angular',
            imageUrl: 'course-pic-1.jpg'
        },
        {
            id: 2,
            code: 'SI40',
            intitule: 'Systèmes d’Information et Bases de Données',
            imageUrl: 'course-pic-2.jpg'
        },
        {
            id: 3,
            code: 'RS40',
            intitule: 'Réseaux et Sécurité',
            imageUrl: 'course-pic-3.png'
        },
        {
            id: 4,
            code: 'AP4A',
            intitule: 'Programmation Objet avec C++',
            imageUrl: 'course-pic-4.gif'
        },
        {
            id: 5,
            code: 'WE4A',
            intitule: 'Développement Web Full Stack',
            imageUrl: 'course-pic-5.gif'
        }
    ];

    getCourses(): Course[] {
        return this.courses;
    }
}
