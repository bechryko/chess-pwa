import { Directive, ElementRef, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
   standalone: true,
   selector: '[loggedOff]',
})
export class LoggedOffDirective implements OnInit {
   private element: HTMLElement;
   private authService: AuthService = inject(AuthService);

   constructor(elref: ElementRef) {
      (this.element = elref.nativeElement as HTMLElement).classList.add("error");
   }

   ngOnInit(): void {
      this.authService.isUserLoggedIn().subscribe({ 
         next: user => {
            if(user !== null) {
               this.element.style.display = "none";
            }
         }, 
         error: error => {
            console.error(error);
         }
      });
   }
}
