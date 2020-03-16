import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/services/guard/auth.guard';
import { AuthRedirectGuard } from './core/services/guard/auth-redirect.guard';
import { ContainerComponent } from './shared/container/container.component';

const routes: Routes = [

    { path: '', redirectTo: 'auth', pathMatch: 'full' },

    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canLoad: [AuthRedirectGuard]
    },

    {
        path: 'authenticated', component: ContainerComponent,
        loadChildren: () => import('./authenticated/authenticated.module').then(m => m.AuthenticatedModule),
        canLoad: [AuthGuard]
    },

    { path: '**', redirectTo: 'auth' }
];


@NgModule({

    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]

})
export class AppRoutingModule { }
