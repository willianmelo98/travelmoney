import { Injectable, NgZone } from '@angular/core';
import { User } from '../model/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  fotoPerfil: string;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public router: Router,
    public auth: AngularFireAuth,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {}

  // Sign in with email/password
  SignIn(email, password) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetLocalUserData(result.user);
        this.SetUserData(result.user);
        this.ngZone.run(() => {
          this.router.navigate(['main']);
        });
      })
      .catch((error) => {
        window.alert('Ops, algo deu errado. Tente novamente !');
      });
  }

  // Sign up with email/password
  SignUp(email, password, name) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
        this.updateUserLogin(name, '');
      })
      .catch((error) => {
        window.alert('Email ja cadastrado ou invalido.');
      });
  }

  updateUserLogin(name, foto) {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name,
        photoURL: foto,
      })
      .then(function () {
        // Update successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  }

  updateUser(name) {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        // Update successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  }

  updateFotoUser(fotoPerfil) {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        photoURL: fotoPerfil,
      })
      .then(function () {
        // Update successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  FacebookAuth() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  async AuthLogin(provider) {
    try {
      const result = await this.auth.signInWithPopup(provider);
      this.SetLocalUserData(result.user);
      this.SetUserData(result.user);

      this.ngZone.run(() => {
        this.router.navigate(['main']);
      });
    } catch (error) {
      window.alert(error);
    }
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  /* Saving user data in localstorage when
    logged in and setting up null when logged out */

  SetLocalUserData(user) {
    if (user) {
      this.userData = user;
      localStorage.setItem('user', JSON.stringify(this.userData));
      JSON.parse(localStorage.getItem('user'));
    } else {
      localStorage.setItem('user', null);
      JSON.parse(localStorage.getItem('user'));
    }
  }
  // Sign out
  SignOut() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
