import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AudioService } from '../services/audio-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PresetNameDialog } from '../dialogs/dialogs.component';
import { BackendService } from '../backend.service';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-presets',
    templateUrl: './presets.component.html',
    styleUrls: ['./presets.component.css']
})
export class PresetsComponent implements OnInit {

    constructor(public data: DataService, private audio: AudioService,
        private backend: BackendService, private auth: AuthService,
        public dialog: MatDialog, private snackbar: MatSnackBar) { }

    ngOnInit(): void {
    }

    createPreset(): void {
        const dialogRef = this.dialog.open(PresetNameDialog, {
            data: 'New preset'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (this.auth.uid == undefined) return; // user has to be logged in
                this.backend.createPreset(this.auth.uid, {
                    name: result,
                    playerStates: this.audio.exportStates()
                })
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
