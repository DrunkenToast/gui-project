import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { SoundAddDialog } from '../dialogs/dialogs.component';
import { NewSound } from '../models/sound-data';
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-pillow',
  templateUrl: './pillow.component.html',
  styleUrls: ['./pillow.component.css']
})
export class PillowComponent implements OnInit {

  constructor(private data: DataService, private auth: AuthService,
        public dialog: MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

    get isAdmin() {
        return this.auth.isAdmin;
    }
}
