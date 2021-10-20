import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppStateInterface } from 'src/app/appState.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { isAuthenticatedSelector } from 'src/app/auth/store/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.pipe(select(isAuthenticatedSelector));
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
