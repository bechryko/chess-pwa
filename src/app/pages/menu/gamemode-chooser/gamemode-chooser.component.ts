import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gamemode-chooser',
  templateUrl: './gamemode-chooser.component.html',
  styleUrls: ['./gamemode-chooser.component.scss']
})
export class GamemodeChooserComponent implements OnInit {
  public loggedInUser?: firebase.default.User | null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe((user) => {
      this.loggedInUser = user;
    }, error => {
      console.error(error);
    });
  }
}
