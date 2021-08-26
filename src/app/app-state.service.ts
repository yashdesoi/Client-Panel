import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  sidebarState = new Subject<string>();

  constructor() { }
}
