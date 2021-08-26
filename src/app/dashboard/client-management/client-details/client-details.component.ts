import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/app-state.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  constructor(private appStateService: AppStateService) { }

  ngOnInit(): void {
    this.appStateService.sidebarState.next('ClientDetails');
  }

}
