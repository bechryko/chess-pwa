import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  loggedInUser?: firebase.default.User | null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe((user) => {
      this.loggedInUser = user;
    }, error => {
      console.error(error);
    });
  }

  public logout() {
    this.authService.logout()
      .catch((error) => {
        console.error(error);
      });
  }
}
