import { Routes } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { InitialPageComponent } from './features/initial-page/initial-page.component';

export const routes: Routes = [
    {path: 'sign-up', component: SignUpComponent},
    {path: 'sign-in', component: SignInComponent},
    {path: 'flixsy', component: InitialPageComponent},
    {path: '', redirectTo: 'flixsy', pathMatch: 'full'}
];
