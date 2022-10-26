import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
    // isAdmin: boolean = false;
    adminSubscription: Subscription | undefined;

    constructor(private auth: AuthService) { }

    ngOnDestroy(): void {
        this.adminSubscription?.unsubscribe();
    }

    ngOnInit(): void {
        console.log("yes")
        // this.adminSubscription = this.auth.isAdmin().subscribe(status =>
        //     this.isAdmin = status
        // )
    }

    get isLoggedIn(): boolean {
        return this.auth.isLoggedIn;
    }

    get isAdmin(): boolean {
        return this.auth.isAdmin;
    }

    logout(): void {
        this.auth.logout();
    }
}
