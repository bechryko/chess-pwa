import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { Gamemode, LeaderboardElement } from './model';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent implements OnInit {
  private db?: IDBDatabase;
  private objectStoreName = 'chessPWA';
  public leaderboardElements$?: Observable<LeaderboardElement[]>;

  constructor(private swUpdate: SwUpdate, private location: Location) { }

  ngOnInit(): void {
    this.swUpdate.checkForUpdate().then(data => {
      if (data) {
        alert("new version available");
        window.location.reload();
      }
    })

    const request = indexedDB.open(this.objectStoreName + '-db', 1);

    request.onerror = (event: any) => {
      console.error('Database error: ', event.target.error);
    };

    request.onupgradeneeded = (event: any) => {
      this.db = event.target.result as IDBDatabase;
      this.createObjectStore();
    };

    request.onsuccess = (event: any) => {
      this.db = event.target.result as IDBDatabase;
      this.loadItems();
    };
  }

  private createObjectStore() {
    if(!this.db) throw new Error('Database not initialized');
    const objectStore = this.db.createObjectStore(this.objectStoreName, {
      keyPath: 'id',
      autoIncrement: true,
    });
    objectStore.createIndex('gamemode', 'gamemode', { unique: false });
    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('score', 'score', { unique: false });
  }

  private loadItems() {
    if(!this.db) throw new Error('Database not initialized');
    const objectStore = this.db.transaction(this.objectStoreName).objectStore(this.objectStoreName);

    this.leaderboardElements$ = new Observable<LeaderboardElement[]>((observer) => {
      const items: LeaderboardElement[] = [];

      objectStore.openCursor().onsuccess = (event: any) => {
        const cursor = event.target.result;        
        if (cursor) {
          items.push(cursor.value);
          cursor.continue();
        } else {
          observer.next(items);
        }
      };
    });
  }

  public goBack() {
    this.location.back();
  }
}
