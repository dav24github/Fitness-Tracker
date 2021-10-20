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
import { Subject } from 'rxjs';
import { UIService } from '../shared/iu.service';
import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private auth: Auth,
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  initAuthListener() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.trainingService.cancelSubscriptions();
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    createUserWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, undefined, 3000);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    signInWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((result) => {
        // this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, undefined, 3000);
      });
  }

  logout() {
    signOut(this.auth);
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
