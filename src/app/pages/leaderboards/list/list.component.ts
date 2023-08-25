import { Component, Input } from '@angular/core';
import { LeaderboardElement } from 'src/app/shared/models/LeaderboardElements';

@Component({
   selector: 'app-list',
   templateUrl: './list.component.html',
   styleUrls: ['../leaderboards.component.scss']
})
export class ListComponent {
   @Input() leaderboardElements: LeaderboardElement[] | null = null;
}
