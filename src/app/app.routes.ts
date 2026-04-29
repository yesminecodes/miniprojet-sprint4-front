import { Routes } from '@angular/router';
import { canActivateAuthRole } from './guards/auth-role.guard';
import { Games } from './games/games';
import { UserProfile } from './user-profile/user-profile';
import { Forbidden } from './forbidden/forbidden';

export const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },

  {
    path: 'games',
    component: Games,
    canActivate: [canActivateAuthRole],
    data: { role: 'ADMIN' }
  },

  {
    path: 'profile',
    component: UserProfile
  },

  {
    path: 'forbidden',
    component: Forbidden
  }
];