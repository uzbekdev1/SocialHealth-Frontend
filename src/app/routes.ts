import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ChatComponent } from './components/chat/chat.component';
import { ExploreComponent } from './components/explore/explore.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    }, 
    {
        path: 'dashboard', 
        component: NavComponent,
        canActivate:[AuthGuard],
        children:[{path:'', component:DashboardComponent}]
    },
    {
        path: 'explore', 
        component: NavComponent,
        canActivate:[AuthGuard],
        children:[{path:'', component:ExploreComponent}]
    },
    {
        path: 'chat', 
        component: NavComponent,
        canActivate:[AuthGuard],
        children:[{path:'', component:ChatComponent}]
    },
    {
        path: 'settings', 
        component: NavComponent,
        canActivate:[AuthGuard],
        children:[{path:'', component:SettingsComponent}]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];