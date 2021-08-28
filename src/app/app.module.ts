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
import { ClientListComponent } from './dashboard/client-list/client-list.component';
import { ClientDetailsComponent } from './dashboard/client-details/client-details.component';
import { AddClientComponent } from './dashboard/add-client/add-client.component';
import { EditClientComponent } from './dashboard/edit-client/edit-client.component';
import { SettingsComponent } from './settings/settings.component';

import { environment as env } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { EditBalanceComponent } from './dashboard/client-details/edit-balance/edit-balance.component';

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
    EditBalanceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(env.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
