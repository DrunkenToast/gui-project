import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { docData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { BackendService } from '../backend.service';
import { Admin } from '../models/admin-data';

const TOKEN_KEY = 'token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    token?: string;

    constructor(private auth: Auth, private backend: BackendService, private router: Router) {
        const item = localStorage.getItem(TOKEN_KEY);
        if (item)
            this.token = item;
    }

    signup(email: string, pw: string): Promise<UserCredential> {
        return createUserWithEmailAndPassword(this.auth, email, pw)
    }

    login(email: string, pw: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            signInWithEmailAndPassword(this.auth, email, pw)
                .then(() => {
                    this.auth.currentUser?.getIdToken()
                        .then((token: string) => {
                            this.token = token;
                            localStorage.setItem(TOKEN_KEY, token);
                            resolve();
                        })
                    resolve();
                })
        })
    }

    logout(): void {
        console.log('logging out');
        this.auth.signOut();
        this.token = undefined;
        localStorage.removeItem(TOKEN_KEY);
        this.router.navigate(['']);
    }

    isLoggedIn(): boolean {
        return this.token != null;
    }

    isAdmin(): Observable<boolean> {
        if (!this.auth.currentUser) return of(false);
        return this.backend.getAdmin(this.auth.currentUser.uid).pipe(map(
            (admin: Admin): boolean => {
                return admin ? true : false;
            }
        ));
    }
}
