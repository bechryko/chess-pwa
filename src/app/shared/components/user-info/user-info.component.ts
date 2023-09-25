import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
   selector: 'app-user-info',
   standalone: true,
   imports: [
      CommonModule,
      MatProgressSpinnerModule,
      MatSnackBarModule
   ],
   templateUrl: './user-info.component.html',
   styleUrls: ['./user-info.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent {

   constructor(
      public authService: AuthService,
      private clipboard: Clipboard,
      private copySnackbar: MatSnackBar
   ) { }

   public copyUserName(username: string): void {
      this.clipboard.copy(username);
      this.copySnackbar.open("Username copied to clipboard!", "Dismiss", { duration: 2000 });
   }

}
