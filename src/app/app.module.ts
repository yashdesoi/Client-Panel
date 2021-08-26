import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ClientListComponent } from './dashboard/client-management/client-list/client-list.component';
import { ClientDetailsComponent } from './dashboard/client-management/client-details/client-details.component';
import { AddClientComponent } from './dashboard/client-management/add-client/add-client.component';
import { EditClientComponent } from './dashboard/client-management/edit-client/edit-client.component';
import { SettingsComponent } from './settings/settings.component';

import { environment as env } from 'src/environments/environment';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ClientListComponent,
    ClientDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    SettingsComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(env.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
