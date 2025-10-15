import { Routes } from '@angular/router';
import { WebLayout } from './layouts/web-layout/web-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { HomeView } from './views/admin/home-view/home-view';
import { ProfileView } from './views/admin/profile-view/profile-view';
import { LoginView } from './views/auth/login-view/login-view';
import { HomeView as WebHomeView } from './views/web/home-view/home-view';
import { ContactView } from './views/web/contact-view/contact-view';
import { RegisterView } from './views/auth/register-view/register-view';
import { TermsView } from './views/web/terms-view/terms-view';
import { authGuard } from './guards/auth-guard';
import { noAuthGuard } from './guards/no-auth-guard';
import { AuthService } from './services/auth-service';
import { LogoutView } from './views/auth/logout-view/logout-view';

export const routes: Routes = [
    
    // Site routes goes here 
    { 
        path: '', 
        component: WebLayout,
        children: [
          { path: '', component: WebHomeView, pathMatch: 'full'},
          { path: 'contact', component: ContactView },
          { path: 'terms', component: TermsView }
        ]
    },
    
    // Admin routes goes here
    { 
        path: 'admin',
        component: AdminLayout, 
        canActivate: [authGuard],
        children: [
          { path: '', component: HomeView, pathMatch: 'full'},
          { path: 'home', component: HomeView },
          { path: 'profile', component: ProfileView },
        ]
    },
    
    // Auth routes goes here
    { 
        path: '',
        component: AuthLayout,
        canActivate: [noAuthGuard], 
        children: [
          { path: 'login', component: LoginView },
          { path: 'register', component: RegisterView },
          { path: 'logout', component: LogoutView },
        ]
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];