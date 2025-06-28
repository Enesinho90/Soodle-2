export interface User {
    id: number;
    email: string;
    roles: string[]; 
    avatar: string; 
    password: string;
    nom: string;
    prenom: string;
}