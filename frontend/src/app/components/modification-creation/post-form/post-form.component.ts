import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent implements OnInit {

  // ID de l’unité d’enseignement récupéré depuis l’URL
  uniteEnseignementId: number = 0;



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
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.uniteEnseignementId = parseInt(idParam, 10);
        console.log('UE ID récupéré :', this.uniteEnseignementId);
      }
    });
  }

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
  onSubmit(): void {
    const user = this.authService.getCurrentUser();
    const utilisateur_id_given = user?.id ?? null;
    const formValues = this.postForm.value;

    // Création de l'objet FormData pour l'envoi du post
    const formData = new FormData();
    formData.append('utilisateur_id', utilisateur_id_given?.toString() || '');
    formData.append('unite_enseignement_id', this.uniteEnseignementId.toString());
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
