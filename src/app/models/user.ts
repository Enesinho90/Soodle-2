export interface User {
    id: number;
    email: string;
    roles: string[]; // tableau de rôles
    avatar: string; // lien vers une image
    password: string;
    nom: string;
    prenom: string;
}