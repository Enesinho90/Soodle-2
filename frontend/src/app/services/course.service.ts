import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private courses: Course[] = [

    ];

    getCourses(): Course[] {
        return this.courses;
    }
}
