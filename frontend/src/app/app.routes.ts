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



export const routes: Routes = [
    { path: 'courses', component: CoursesPageComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'courses', pathMatch: 'full' },
    { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard] },
    { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginFormComponent },
    { path: 'profil/modifiy', component: ProfilModificationFormComponent, canActivate: [AuthGuard] },
    { path: 'profil/change_password', component: ProfilPasswordFormComponent, canActivate: [AuthGuard] },
    { path: 'admin/add_user', component: UserFormComponent, canActivate: [AuthGuard] },
    { path: 'admin/add_ue', component: UeFormComponent, canActivate: [AuthGuard] },
    { path: 'courses/:id', component: UeContentPageComponent, canActivate: [AuthGuard] },
    { path: 'courses/:id/post', component: PageCreationModificationComponent, canActivate: [AuthGuard] },
    { path: 'admin/affectations/:id', component: AffectationUeFormComponent, canActivate: [AuthGuard] },
    { path: 'admin/modify_user/:id', component: ModifyUserFormComponent, canActivate: [AuthGuard] },
    { path: 'admin/modify_ue/:id', component: ModifyUeFormComponent, canActivate: [AuthGuard] },
    { path: 'courses/:id/participants', component: ParticipantsComponent, canActivate: [AuthGuard] }
];