import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from 'src/app/backend.service';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

    constructor(private snackbar: MatSnackBar, private dialog: MatDialog, private backend: BackendService) { }

    ngOnInit(): void {
    }
}
