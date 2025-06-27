export interface User {
    id: number;
    email: string;
    roles: string[]; // tableau de rôles = > a changer selon la bdd en JSON mais pas sur
    avatar: string; // lien vers une image
    password: string;
    nom: string;
    prenom: string;
}