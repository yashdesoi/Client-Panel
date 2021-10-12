import { NgModule } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { ClientManagementService } from 'src/services/client-management.service';
import { SettingsService } from 'src/services/settings.service';



@NgModule({
  providers: [
    AuthService,
    ClientManagementService,
    SettingsService
  ]
})
export class CoreModule { }
