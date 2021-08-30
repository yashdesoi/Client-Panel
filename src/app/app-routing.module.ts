import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddClientComponent } from './dashboard/client-management/add-client/add-client.component';
import { ClientDetailsComponent } from './dashboard/client-management/client-details/client-details.component';
import { ClientListComponent } from './dashboard/client-management/client-list/client-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditClientComponent } from './dashboard/client-management/edit-client/edit-client.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'clients',
        pathMatch: 'full'
      },
      {
        path: 'clients',
        component: ClientListComponent
      },
      {
        path: 'clients/add',
        component: AddClientComponent
      },
      {
        path: 'clients/:id',
        component: ClientDetailsComponent
      },
      {
        path: 'clients/:id/edit',
        component: EditClientComponent
      }
    ]
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
