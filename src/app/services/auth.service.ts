import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser || localStorage.getItem('isLoggedIn') === 'true';
  }

  login(objectLogin: any) {
    return signInWithEmailAndPassword(this.auth, objectLogin.email, objectLogin.password)
      .then((userCredential) => {
        if (objectLogin.rememberMe) {
          localStorage.setItem('isLoggedIn', 'true');
        }
        return userCredential;
      });
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth).then(() => {
      localStorage.removeItem('isLoggedIn');
    });
  }

  getUser() {
    return this.userSubject.asObservable();
  }
}
