import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-pillow',
    templateUrl: './pillow.component.html',
    styleUrls: ['./pillow.component.css']
})
export class PillowComponent implements OnInit {

    constructor(private auth: AuthService, public dialog: MatDialog) { }

    ngOnInit(): void {
    }

    get isAdmin() {
        return this.auth.isAdmin;
    }
}
