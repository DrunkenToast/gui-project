import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data-service.service';
import { Preset } from '../../models/preset-data';
import { AudioService } from '../../services/audio-service.service';
import { ConfirmDeleteDialog, PresetNameDialog } from '../../dialogs/dialogs.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-preset-card',
  templateUrl: './preset-card.component.html',
  styleUrls: ['./preset-card.component.css']
})
export class PresetCardComponent implements OnInit {

  @Input()
  presetData: Preset = {
    id: 0,
    name: 'No preset',
    playerStates: [],
  }

  constructor(private audio: AudioService, public dialog: MatDialog, private data: DataService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  loadPreset() {
    this.audio.loadStates(this.presetData.playerStates);
  }

  saveCurrentState() {
    this.data.editPresetStates(this.presetData, this.audio.exportStates())
      .then(() => {
        this.snackbar.open('Current states are saved to the preset! 🎉', '', {
          duration: 2000,
        });
      })
      .catch(err => {
        this.snackbar.open(`Failed to save: ${err}`, '', {
          duration: 2000,
        });
      });;
  }

  renamePreset() {
    const dialogRef = this.dialog.open(PresetNameDialog, {
      width: '250px',
      data: this.presetData.name
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.presetData.name = result;
        this.data.editPreset(this.presetData).then(() => {
          this.snackbar.open(`Preset renamed to '${result}'! 🎉`, '', {
            duration: 2000,
          });
        })
          .catch(err => {
            this.snackbar.open(`Failed to rename: ${err}`, '', {
              duration: 2000,
            });
          });
      }
    });
  }

  deletePreset() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.data.deletePreset(this.presetData.id)
          .then(() => {
            this.snackbar.open('Preset removed', '', {
              duration: 2000,
            });
          })
          .catch(err => {
            this.snackbar.open(`Failed to delete: ${err}`, '', {
              duration: 2000,
            });
          });
      }
    });
  }
}
