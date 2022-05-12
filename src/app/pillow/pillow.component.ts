import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SoundAddDialog } from '../dialogs/dialogs.component';
import { SoundCreate } from '../models/sound-data';
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-pillow',
  templateUrl: './pillow.component.html',
  styleUrls: ['./pillow.component.css']
})
export class PillowComponent implements OnInit {

  constructor(private data: DataService, public dialog: MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  createSound(): void {
    const dialogRef = this.dialog.open(SoundAddDialog);

    dialogRef.afterClosed().subscribe((result: SoundCreate) => {
      if (result) {
        this.data.createSound(result)
          .then(() => {
            this.snackbar.open(`'${result}' created! 🎉`, '', {
              duration: 2000,
            });
          })
          .catch(err => {
            this.snackbar.open(`Failed to create sound: ${err}`, '', {
              duration: 2000,
            });
          });
      }
    });
  }
}
