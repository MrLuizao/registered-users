import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) {}

  getRegisteredUsers(): Observable<any[]> {
    const usersCollection = collection(this.firestore, 'registered-users');
    return collectionData(usersCollection, { idField: 'id' });
  }  

}
