import { Injectable } from '@angular/core';
import { LeaderboardElement, LeaderboardElementWithId } from './model';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { LocalDatabaseService } from './local-database.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class DatabaseSyncService {
   private readonly leaderboardTableName = 'Leaderboard';
   private supabase: SupabaseClient;

   constructor(private dbService: LocalDatabaseService) {
      this.supabase = createClient(
         environment.supabaseUrl,
         environment.supabaseKey
      );
   }

   private async getLeaderboardEntriesOnServer(): Promise<LeaderboardElement[]> {
      const data = await this.supabase.from(this.leaderboardTableName).select('*');
      return data.data as LeaderboardElement[];
   }

   /*private async getLeaderboardEntriesOnClient(): Promise<LeaderboardElement[]> {
      let entries: LeaderboardElement[] = [];
      if(this.dbService.isLoaded) {
         entries = await firstValueFrom(this.dbService.loadItems()) as LeaderboardElement[];
      } else {
         setTimeout(async () => {
            entries = await this.getLeaderboardEntriesOnClient();
         }, 500);
      }
      return entries;
   }*/
   private async getLeaderboardEntriesOnClient(): Promise<LeaderboardElement[]> {
      let entries: LeaderboardElement[] = [];
      const interval = setInterval(async () => {
         if(this.dbService.isLoaded) {
            entries = await firstValueFrom(this.dbService.loadItems()) as LeaderboardElement[];
            clearInterval(interval);
         }
      }, 500);
      return entries;
   }

   public syncLeaderboardEntries(): void {
      console.log("syncing leaderboard entries")
      this.getLeaderboardEntriesOnServer().then(serverEntries => {
         this.getLeaderboardEntriesOnClient().then(clientEntries => {
            const newOnServer = serverEntries.filter(serverEntry => {
               return !clientEntries.some(clientEntry => {
                  return DatabaseSyncService.equals(clientEntry, serverEntry);
               });
            });
            const newOnClient = clientEntries.filter(clientEntry => {
               return !serverEntries.some(serverEntry => {
                  return DatabaseSyncService.equals(clientEntry, serverEntry);
               });
            });
            newOnServer.forEach(entry => {
               this.dbService.addItem(entry);
            });
            for(let i = 0; i < newOnClient.length; i++) {
               const newEntry = newOnClient[i] as LeaderboardElementWithId;
               const numberOfServerEntries = serverEntries.length;
               newEntry.id = numberOfServerEntries + i;
               this.addLeaderboardElement(newEntry).catch(error => { console.error(error); });
            }
         });
      });
   }

   private async addLeaderboardElement(newEntry: LeaderboardElementWithId) {
      return this.supabase.from(this.leaderboardTableName).insert(newEntry);
   }

   private static equals(entry1: LeaderboardElement, entry2: LeaderboardElement): boolean {
      return entry1.gamemode === entry2.gamemode
         && entry1.name === entry2.name
         && entry1.score === entry2.score;
   }
}
