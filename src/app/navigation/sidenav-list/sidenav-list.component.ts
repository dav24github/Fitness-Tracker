import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppStateInterface } from 'src/app/appState.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { isAuthenticatedSelector } from 'src/app/auth/store/selectors';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  authSubscription!: Subscription;
  isAuth$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.pipe(select(isAuthenticatedSelector));
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe;
  }
}
