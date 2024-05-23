import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {PasswordResetComponent} from "./auth/password-reset/password-reset.component";
import {SignupComponent} from "./auth/signup/signup.component";

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'password-reset', component: PasswordResetComponent},
    {path: 'signup', component: SignupComponent},
];
