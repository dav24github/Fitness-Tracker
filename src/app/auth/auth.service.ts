import { Injectable } from '@angular/core';

import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppStateInterface } from '../appState.interface';
import { UIService } from '../shared/iu.service';
import { startLoadingAction, stopLoadingAction } from '../shared/store/actions';
import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-data.model';
import {
  setAuthenticatedAction,
  setUnautheticatedActions,
} from './store/actions';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private auth: Auth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<AppStateInterface>
  ) {}

  initAuthListener() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.store.dispatch(setAuthenticatedAction());
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.store.dispatch(setUnautheticatedActions());
        this.authChange.next(false);
        this.trainingService.cancelSubscriptions();
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(startLoadingAction());
    createUserWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((result) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(stopLoadingAction());
      })
      .catch((error) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(stopLoadingAction());
        this.uiService.showSnackbar(error.message, undefined, 3000);
      });
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(startLoadingAction());
    signInWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((result) => {
        // this.uiService.loadingStateChanged.next(false);
        // this.store.dispatch(stopLoadingAction())
      })
      .catch((error) => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(stopLoadingAction());
        this.uiService.showSnackbar(error.message, undefined, 3000);
      });
  }

  logout() {
    signOut(this.auth);
  }
}
