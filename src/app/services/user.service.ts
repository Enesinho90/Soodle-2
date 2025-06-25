import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private users: User[] = [
        {
            id: 1,
            email: "jeandupont@puenta.fr",
            roles: ["ROLE_USER", "ROLE_ADMIN"],
            avatar: "avatar.jpg",
            password: "caca",
            nom: "Jean",
            prenom: "Dupont"
        },
        {
            id: 2,
            email: "marieleroy@puenta.fr",
            roles: ["ROLE_USER"],
            avatar: "avatar2.jpg",
            password: "azerty",
            nom: "Leroy",
            prenom: "Marie"
        },
        {
            id: 3,
            email: "lucdubois@puenta.fr",
            roles: ["ROLE_USER", "ROLE_PROFESSOR"],
            avatar: "avatar3.jpg",
            password: "motdepasse",
            nom: "Dubois",
            prenom: "Luc"
        },
        {
            id: 4,
            email: "anais.martin@puenta.fr",
            roles: ["ROLE_USER"],
            avatar: "avatar4.jpg",
            password: "123456",
            nom: "Martin",
            prenom: "Anaïs"
        },
        {
            id: 5,
            email: "thomas.durand@puenta.fr",
            roles: ["ROLE_USER", "ROLE_ADMIN"],
            avatar: "avatar5.jpg",
            password: "adminpass",
            nom: "Durand",
            prenom: "Thomas"
        }
    ]

    getUsers(): User[] {
        return this.users;
    }
}
