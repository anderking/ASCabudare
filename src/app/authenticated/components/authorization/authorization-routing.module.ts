import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AuthorizationComponent,

} from './components/index';


const routes: Routes = [
  {
    path: '',
    component: AuthorizationComponent,
    children: [
      { path: '', redirectTo: 'allows', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
