import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Injectable()
export class SnackbarService {
  horizontalPosition: any = 'left';
  verticalPosition: any = 'bottom';

  constructor(private snackBar: MatSnackBar) { }

  snackbarSuccess(message: any) {
    if (message) {
      this.snackBar.open(message, 'Close', {
        duration: environment.snackBarDuration,
        horizontalPosition: 'center',
        verticalPosition: this.verticalPosition,
        panelClass: ['success-snackbar']
      });
    }
  }

  snackbarAddUpdate(moduleName: string, isAdded: any) {
    if (moduleName) {
      let eventLabel = !isAdded ? 'Added' : 'Updated';
      this.snackBar.open(moduleName + ' ' + eventLabel + ' Successfully.' , '', {
        duration: environment.snackBarDuration,
        horizontalPosition: 'center',
        verticalPosition: this.verticalPosition,
        panelClass: ['success-snackbar']
      });
    }
  }

  snackbarError(message: string, horizontalPosition: string | null | undefined) {
    if (message) {
      this.snackBar.open(message, 'Close', {
        duration: environment.snackBarDuration,
        horizontalPosition: horizontalPosition || this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['error-snackbar'],
      });
    }
  }

  snackbarInfo(message: any) {
    if (message) {
      this.snackBar.open(message, 'Close', {
        duration: environment.snackBarDuration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['info-snackbar']
      });
    }
  }

  snackbarWraning(message: any) {
    if (message) {
      this.snackBar.open(message, 'Close', {
        duration: environment.snackBarDuration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['wraning-snackbar']
      });
    }
  }

  snackbarDefault(message: any) {
    if (message) {
      this.snackBar.open(message, 'Close', {
        duration: environment.snackBarDuration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['default-snackbar']
      });
    }
  }

  snackbarClose() {
    this.snackBar.dismiss();
  }

}
