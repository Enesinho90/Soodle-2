import { Routes } from '@angular/router';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { ProfilModificationFormComponent } from './forms/profil-modification-form/profil-modification-form.component';
import { ProfilPasswordFormComponent } from './forms/profil-password-form/profil-password-form.component';
import { UserFormComponent } from './forms/user-form/user-form.component';
import { UeFormComponent } from './forms/ue-form/ue-form.component';
import { UeContentPageComponent } from './pages/ue-content-page/ue-content-page.component';
import { AffectationUeFormComponent } from './forms/affectation-ue-form/affectation-ue-form.component';
import { ModifyUserFormComponent } from './forms/modify-user-form/modify-user-form.component';
import { ModifyUeFormComponent } from './forms/modify-ue-form/modify-ue-form.component';
import { PageCreationModificationComponent } from './pages/page-creation-modification/page-creation-modification.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { AuthGuard } from './guards/auth.guard';
import { AffectationGuard } from './guards/affectation.guard';
import { AdminGuard } from './guards/admin.guard';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';
import { MesDevoirsComponent } from './pages/mes-devoirs/mes-devoirs.component';
import { AjouterDevoirComponent } from './pages/ajouter-devoir/ajouter-devoir.component';
import { CorrectionDevoirsComponent } from './pages/correction-devoirs/correction-devoirs.component';
import { ProfGuard } from './guards/prof.guard';



export const routes: Routes = [
    { path: 'courses', component: CoursesPageComponent, canActivate: [AuthGuard,] },
    { path: '', redirectTo: 'courses', pathMatch: 'full' },
    { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginFormComponent },
    { path: 'profil/modifiy', component: ProfilModificationFormComponent, canActivate: [AuthGuard] },
    { path: 'profil/change_password', component: ProfilPasswordFormComponent, canActivate: [AuthGuard] },
    { path: 'admin/add_user', component: UserFormComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'admin/add_ue', component: UeFormComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'courses/:id', component: UeContentPageComponent, canActivate: [AuthGuard, AffectationGuard] },
    { path: 'courses/:id/post', component: PageCreationModificationComponent, canActivate: [AuthGuard, AffectationGuard,ProfGuard] },
    { path: 'admin/affectations/:id', component: AffectationUeFormComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'admin/modify_user/:id', component: ModifyUserFormComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'admin/modify_ue/:id', component: ModifyUeFormComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'courses/:id/participants', component: ParticipantsComponent, canActivate: [AuthGuard, AffectationGuard,] },
    { path: 'courses/:id/forum', component: ForumPageComponent, canActivate: [AuthGuard] },
    {path : 'mes-devoir',component : MesDevoirsComponent, canActivate : [AuthGuard]},
    {path :'correction-devoir', component : CorrectionDevoirsComponent, canActivate : [AuthGuard,ProfGuard]},
    {path :'ajouter-devoir',component : AjouterDevoirComponent,  canActivate : [AuthGuard,ProfGuard]}
];