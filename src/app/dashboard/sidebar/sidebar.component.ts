import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/app-state.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private subscription: Subscription;
  public state;

  constructor(private appStateService: AppStateService) { }

  ngOnInit(): void {
    this.subscription = this.appStateService.sidebarState.subscribe(state => {
      this.state = state;
      console.log(this.state);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
