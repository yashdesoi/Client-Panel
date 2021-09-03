import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { Settings } from 'src/models/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settingsChanged = new Subject<Settings>();
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: false
  };

  constructor(private flashMessageService: FlashMessagesService,
              private router: Router) { 
    const settings = localStorage.getItem('settings');
    if (settings) {
      this.settings = JSON.parse(settings);
    }
  }

  saveSettings(newSettings) {
    this.settings = newSettings;
    this.settingsChanged.next(newSettings);
    localStorage.setItem('settings', JSON.stringify(this.settings));
    this.flashMessageService.show('Settings saved', {
      cssClass: 'alert alert-success',
      timeout: 4000
    });
    this.router.navigate(['/']);
  }
}
