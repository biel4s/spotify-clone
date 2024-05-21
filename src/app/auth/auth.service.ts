import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import firebase from "firebase/compat";
import {GoogleAuthProvider} from 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: firebase.User | null = null;
  errorMessege: string = '';

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  async googleAuth(): Promise<void> {
    await this.afAuth.signInWithPopup(new GoogleAuthProvider());
    await this.router.navigate(['/home']).then();
  }

  createWithEmail(email: string, password: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        this.router.navigate(['/home']).then();
      })
      .catch((error) => {
        this.errorMessege = error.message;
      });
  }

  loginWithEmail(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        this.router.navigate(['/home']).then();
      })
      .catch((error) => {
        this.errorMessege = error.message;
      });
  }

  logout(): void {
    this.afAuth.signOut().then();
    this.user = null;
    this.router.navigate(['/login']).then();
  }
}
