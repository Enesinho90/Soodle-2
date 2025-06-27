import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {

  // Type de post reçu du parent : 'message' ou 'partager'
  @Input() selectType: string = 'message';

  // Affiche le champ fichier uniquement si type = 'partager'
  get showExtraField(): boolean {
    return this.selectType !== 'message';
  }

  // Formulaire avec 3 champs : titre, fichier, contenu
  postForm = new FormGroup({
    titre: new FormControl(''),
    fichier: new FormControl<File | null>(null),
    contenu: new FormControl('')
  });

  // Pour savoir si un fichier a été sélectionné
  fichierSelectionne: boolean = false;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  // Quand l'utilisateur sélectionne un fichier
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (file) {
      this.postForm.get('fichier')?.setValue(file);
      this.fichierSelectionne = true;
      console.log('Fichier sélectionné :', file.name);
    }
  }

  // Quand on clique sur "Publier"
  onSubmit() {
    const user = this.authService.getCurrentUser();
    const utilisateur_id_given = user?.id ?? null;
    const formValues = this.postForm.value;

    // Création de l'objet FormData pour l'envoi du post
    const formData = new FormData();
    formData.append('utilisateur_id', utilisateur_id_given?.toString() || '');
    formData.append('unite_enseignement_id', '6'); // valeur fixe pour le test //TODO : A remplacer par le réel id de l'ue
    formData.append('type', this.showExtraField.toString());
    formData.append('titre', formValues.titre || '');
    formData.append('contenu', formValues.contenu || '');

    // Ajouter le fichier si sélectionné
    const fichierFile = formValues.fichier as File | null;
    if (fichierFile) {
      formData.append('fichier', fichierFile);
      console.log('Fichier à envoyer:', fichierFile.name);
    }

    console.log('Envoi du FormData...');

    // Appel au service pour envoyer les données
    this.postService.addPost(formData).subscribe({
      next: (res) => {
        console.log('Post ajouté :', res);
        this.postForm.reset();
        this.fichierSelectionne = false;
      },
      error: (err) => {
        console.error('Erreur :', err);
      }
    });
  }
}
