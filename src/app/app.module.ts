import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { environment as env } from 'src/environments/environment';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SettingsModule } from './settings/settings.module';
import { NotFoundModule } from './not-found/not-found.module';
import { NavbarModule } from './navbar/navbar.module';
import { AppGuard } from './app.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(env.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: env.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

    // Custom
    CoreModule,
    SharedModule,
    SettingsModule,
    NotFoundModule,
    NavbarModule,
    AuthModule,
    DashboardModule,
    AppRoutingModule
  ],
  providers: [
    AppGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
