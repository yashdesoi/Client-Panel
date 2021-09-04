import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Settings } from 'src/models/Settings';
import { SettingsService } from 'src/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  settings: Settings;

  constructor(private settingsService: SettingsService,
              private router: Router) { }

  ngOnInit(): void {
    this.settings = { ...this.settingsService.settings };
    this.form = new FormGroup({
      'allowRegistration': new FormControl(this.settings.allowRegistration),
      'disableBalanceOnAdd': new FormControl(this.settings.disableBalanceOnAdd),
      'disableBalanceOnEdit': new FormControl(this.settings.disableBalanceOnEdit),
    });
  }

  onSaveSettings() {
    this.settingsService.saveSettings(this.form.value);
    this.router.navigate(['/']);
  }

}
