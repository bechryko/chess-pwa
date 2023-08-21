import { Component, Input } from '@angular/core';
import { LeaderboardElement } from 'src/app/services/model';

@Component({
   selector: 'app-list',
   templateUrl: './list.component.html',
   styleUrls: ['../leaderboards.component.scss']
})
export class ListComponent {
   @Input() leaderboardElements: LeaderboardElement[] | null = null;
}
