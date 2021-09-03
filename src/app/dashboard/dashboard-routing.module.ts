import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from '../app.guard';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientListComponent } from './client-list/client-list.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [AppGuard],
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
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
