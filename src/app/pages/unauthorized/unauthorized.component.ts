import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-unauthorized',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './unauthorized.component.html',
   styleUrls: ['../not-found/not-found.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnauthorizedComponent {
   constructor(private router: Router) { }

   public toMenu(): void {
      this.router.navigateByUrl('/menu');
   }

}
