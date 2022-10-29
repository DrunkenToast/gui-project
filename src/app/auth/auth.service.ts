import { Injectable } from '@angular/core';
import { Auth, authState, browserLocalPersistence, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, User, UserCredential } from '@angular/fire/auth';
import { docData } from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
import { Router } from '@angular/router';
import { EMPTY, firstValueFrom, map, Observable, of, switchMap, take } from 'rxjs';
import { BackendService } from '../backend.service';
import { Admin } from '../models/admin-data';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public readonly user: Observable<User | null> = EMPTY;
    private admin: boolean = false;

    constructor(private auth: Auth, private backend: BackendService, private router: Router) {
        this.auth.setPersistence(browserLocalPersistence);
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
            switchMap(user => {
                if (user) { // logged in
                    // TODO: check if this is okay
                    return this.backend.getAdmin(user.uid).pipe(
                        take(1),
                        map(admin => !!admin)
                    )
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
                .then(() => resolve())
                .catch((err) => reject(err));
        })
    }

    logout(): void {
        console.log('logging out');
        this.auth.signOut();
        this.router.navigate(['/login']);
    }

    get isLoggedIn(): boolean {
        return !!this.auth.currentUser;
    }

    get isAdmin(): boolean {
        return this.admin;
    }
}
