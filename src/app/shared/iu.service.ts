import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(message: string, action: string | undefined, duration: number) {
    this.snackbar.open(message, action, {
      duration: duration,
    });
  }
}
