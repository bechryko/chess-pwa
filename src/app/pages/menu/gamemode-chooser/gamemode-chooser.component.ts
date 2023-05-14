import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-gamemode-chooser',
   templateUrl: './gamemode-chooser.component.html',
   styleUrls: ['./gamemode-chooser.component.scss']
})
export class GamemodeChooserComponent implements OnInit {
   public loggedInUser?: firebase.default.User | null;

   constructor(private authService: AuthService, private router: Router) { }

   ngOnInit(): void {
      this.authService.isUserLoggedIn().subscribe((user) => {
         this.loggedInUser = user;
      }, error => {
         console.error(error);
      });
   }

   startPvP() {
      localStorage.setItem("chessPWA-gamemode", "pvp");
      this.router.navigateByUrl('/game');
   }

   startPvE() {
      localStorage.setItem("chessPWA-gamemode", "pve");
      this.router.navigateByUrl('/game');
   }
}
