import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    constructor(private auth: AuthService) { }

    ngOnInit(): void {
    }

    get isLoggedIn(): boolean {
        return this.auth.isLoggedIn();
    }

    get isAdmin(): Observable<boolean> {
        return this.auth.isAdmin();
    }

    logout(): void {
        this.auth.logout();
    }
}
