import { Injectable } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './model';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
   providedIn: 'root'
})
export class UserService {

   private readonly userTableName = 'Users';
   private supabase: SupabaseClient;

   constructor() {
      this.supabase = createClient(
         environment.supabaseUrl,
         environment.supabaseKey
      );
   }

   async createUser(user: User) {
      return this.supabase.from(this.userTableName).insert(user);
   }

   async getUserName(userId: string): Promise<string> {
      const data = await this.supabase.from(this.userTableName).select('name').eq('id', userId);
      return data.data?.[0]?.name as string ?? "Unknown user";
   }
}
