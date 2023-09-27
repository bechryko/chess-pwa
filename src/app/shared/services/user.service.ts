import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';
import { ChessUser } from '../models/ChessUser';
import { BuiltInUsernamesUtils } from '../utils/built-in-usernames.utils';

@Injectable({
   providedIn: 'root'
})
export class UserService {
   private readonly USER_TABLE_NAME = 'Users';
   private userCollection: AngularFirestoreCollection<ChessUser>;

   constructor(
      private firestore: AngularFirestore
   ) {
      this.userCollection = this.firestore.collection<ChessUser>(this.USER_TABLE_NAME);
   }

   public createUser(user: ChessUser): Promise<void> {
      return this.userCollection.doc(user.id).set(user);
   }

   public getUsername(uid: string): Observable<string> {
      return this.userCollection.doc(uid).get().pipe(
         take(1),
         map(doc => doc.data()),
         map(user => user?.name ?? BuiltInUsernamesUtils.USERNAMES.MISSING)
      );
   }

}
