import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AppStateInterface } from '../appState.interface';
import { isAuthenticatedSelector } from './store/selectors';

@Injectable()
export class AuthGuard implements CanLoad {
  isAuthenticated: boolean = false;
  constructor(private store: Store<AppStateInterface>) {}

  canLoad(route: Route) {
    return this.store.pipe(select(isAuthenticatedSelector), take(1));
  }
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   return this.store.pipe(select(isAuthenticatedSelector), take(1));
  // }
}
