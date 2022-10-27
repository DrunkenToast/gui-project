import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, User, UserCredential } from '@angular/fire/auth';
import { docData } from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
import { Router } from '@angular/router';
import { EMPTY, firstValueFrom, map, Observable, of, switchMap, take } from 'rxjs';
import { BackendService } from '../backend.service';
import { Admin } from '../models/admin-data';

const TOKEN_KEY = 'token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    token?: string;
    public readonly user: Observable<User | null> = EMPTY;
    private admin: boolean = false;

    constructor(private auth: Auth, private backend: BackendService, private router: Router) {
        const item = localStorage.getItem(TOKEN_KEY);
        if (item)
            this.token = item;

        this.user = authState(this.auth);
        this.checkAdminStatus()
            .subscribe(isAdmin => {
                this.admin = isAdmin
            });
    }

    get uid(): string | undefined {
        return this.auth.currentUser?.uid
    }

    emailSignInMethods(email: string): Promise<string[]> {
        return fetchSignInMethodsForEmail(this.auth, email);
    }

    checkAdminStatus(): Observable<boolean> {
        return this.user.pipe(
            traceUntilFirst('auth'),
            // take(1),
            switchMap(user => {
                if (user) { // logged in
                    // TODO: check if this is okay
                    return this.backend.getAdmin(user.uid).pipe(
                        take(1),
                        map(admin => {
                            if (admin) {
                                return true;
                            }
                            return false;

                        }))
                }
                return of(false);
            })
        )
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
                }).catch((err) => reject(err));
        })
    }

    logout(): void {
        console.log('logging out');
        this.auth.signOut();
        this.token = undefined;
        localStorage.removeItem(TOKEN_KEY);
        this.router.navigate(['/login']);
    }

    get isLoggedIn(): boolean {
        // return this.loggedIn;
        return this.token != null;
    }

    get isAdmin(): boolean {
        return this.admin;
    }

    // isAdmin(): Observable<boolean> {
    //     console.log(2)
    //     if (!this.auth.currentUser) return of(false);
    //     console.log(3)
    //     return this.backend.getAdmin(this.auth.currentUser.uid).pipe(
    //         map(
    //             (admin: Admin): boolean => {
    //                 return admin ? true : false;
    //             }
    //         ),
    //         take(1) //prevents having to unsubscribe
    //     );
    // }
}
