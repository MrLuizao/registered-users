import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData} from '@angular/fire/firestore';


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

  // Método para obtener un usuario específico por su ID
  getUserById(id: string): Observable<any> {
    const userDocRef = doc(this.firestore, `registered-users/${id}`);
    return docData(userDocRef, { idField: 'id' }); // Incluye el ID en los datos retornados
  }

}
