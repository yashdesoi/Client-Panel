import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientManagementService } from 'src/services/client-management.service';
import { SettingsService } from 'src/services/settings.service';
import { Client } from 'src/models/Client';
import { AppResources } from '../../app-resources';
import { AuthService } from 'src/services/auth.service';
import { takeWhile } from 'rxjs/operators';

const rePhone = AppResources.PHONE_REGEX;
const reEmail = AppResources.EMAIL_REGEX;

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit, OnDestroy {
  public disableBalanceOnEdit = this.settingsService.settings.disableBalanceOnEdit;
  public showSpinner: boolean;
  public form: FormGroup;
  public firstName = new FormControl('', Validators.required);
  public lastName = new FormControl('', Validators.required);
  public phone = new FormControl('', [
    Validators.required,
    Validators.pattern(rePhone)
  ]);
  public email = new FormControl('', [
    Validators.required,
    Validators.pattern(reEmail)
  ]);
  public balance = new FormControl({
    value: 0,
    disabled: this.disableBalanceOnEdit
  }, [
    Validators.required,
    Validators.min(0)
  ]);

  private client: Client;
  private userId: string;
  private clientId: string;
  private alive: boolean;

  constructor(private clientManagementService: ClientManagementService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private settingsService: SettingsService,
              private router: Router) { }

  ngOnInit(): void {
    this.alive = true;
    this.showSpinner = true;
    this.form = new FormGroup({
      'firstName': this.firstName,
      'lastName': this.lastName,
      'phone': this.phone,
      'email': this.email,
      'balance': this.balance
    });

    this.clientId = this.route.snapshot.params.id;

    this.authService.getAuthState
      .pipe(takeWhile(() => this.alive))
      .subscribe(firebaseUser => {
        if (firebaseUser) {
          this.userId = firebaseUser.uid;
          this.clientManagementService.getClient(this.userId, this.clientId)
            .pipe(takeWhile(() => this.alive))
            .subscribe(client => {
              if (client) {
                this.client = client;
                this.showSpinner = false;
              } else {
                this.router.navigate(['/not-found']);
              }
              this.form.patchValue(this.client);
              this.form.markAllAsTouched();
            });
        }
      });

    this.clientManagementService.clientUpdated
      .pipe(takeWhile(() => this.alive))
      .subscribe(isUpdated => {
        if (isUpdated) {
          this.router.navigate(['../'], { relativeTo: this.route });
        }
        this.showSpinner = false;
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  onUpdateClient() {
    this.showSpinner = true;
    const isEmailUpdated = this.isEmailUpdated;
    const client: Client = this.form.value;
    client.id = this.clientId;
    this.clientManagementService.updateClient(this.userId, client, isEmailUpdated);
  }

  private get isEmailUpdated() {
    return this.client.email !== this.email.value;
  }

}
