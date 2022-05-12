import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AudioService } from '../services/audio-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PresetNameDialog } from '../dialogs/dialogs.component';

@Component({
  selector: 'app-presets',
  templateUrl: './presets.component.html',
  styleUrls: ['./presets.component.css']
})
export class PresetsComponent implements OnInit {

  constructor(public data: DataService, private audio: AudioService, public dialog: MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  createPreset(): void {
    const dialogRef = this.dialog.open(PresetNameDialog, {
      data: 'New preset'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.data.createPreset(result, this.audio.exportStates())
          .then(() => {
            this.snackbar.open(`'${result}' created! 🎉`, '', {
              duration: 2000,
            });
          })
          .catch(err => {
            this.snackbar.open(`Failed to create preset: ${err}`, '', {
              duration: 2000,
            });
          });
      }
    });
  }
}
