import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { ClientManagementService } from 'src/services/client-management.service';
import { SettingsService } from 'src/services/settings.service';
import { AppResources } from '../../app-resources';

const rePhone = AppResources.PHONE_REGEX;
const reEmail = AppResources.EMAIL_REGEX;

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit, OnDestroy {
  disableBalanceOnAdd = this.settingsService.settings.disableBalanceOnAdd;
  showSpinner: boolean;
  form: FormGroup;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  phone = new FormControl('', [
    Validators.required,
    Validators.pattern(rePhone)
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.pattern(reEmail)
  ]);
  balance = new FormControl(
    {
      value: 0,
      disabled: this.disableBalanceOnAdd
    }, [
      Validators.required,
      Validators.min(0)
    ]
  );
  private userId: string;

  // Subscriptions
  private subscription1: Subscription;
  private subscription2: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private settingsService: SettingsService,
              private clientManagementService: ClientManagementService) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.form = new FormGroup({
      'name': new FormGroup({
        'firstName': this.firstName,
        'lastName': this.lastName
      }),
      'phone': this.phone,
      'email': this.email,
      'balance': this.balance
    });

    this.subscription1 = this.authService.getAuthState.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.userId = firebaseUser.uid;
        this.showSpinner = false;
      }
    });

    this.subscription2 = this.clientManagementService.clientAdded.subscribe(isAdded => {
      if (isAdded) {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
      this.showSpinner = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription2.unsubscribe();
  }

  onAddClient() {
    this.showSpinner = true;
    const value = this.getFormValue();
    this.clientManagementService.addClient(this.userId, value);
  }

  private getFormValue() {
    const { name, phone, email, balance } = this.form.value;
    const { firstName, lastName} = name;
    const value = { firstName, lastName, phone, email, balance };

    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    return value;
  }

}
