import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './dashboard/add-client/add-client.component';
import { ClientDetailsComponent } from './dashboard/client-details/client-details.component';
import { ClientListComponent } from './dashboard/client-list/client-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditClientComponent } from './dashboard/edit-client/edit-client.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { AppGuard } from './app.guard';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
