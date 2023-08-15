import { Directive, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
   selector: '[loggedOff]'
})
export class LoggedOffDirective implements OnInit {
   private element: HTMLElement;

   constructor(elref: ElementRef, private authService: AuthService) {
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
