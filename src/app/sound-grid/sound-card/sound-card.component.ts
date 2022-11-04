import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BackendService } from 'src/app/backend.service';
import { Sound } from 'src/app/models/sound-data';
import { AudioService } from 'src/app/services/audio-service.service';
import { ConfirmDeleteDialog, SoundEditDialog } from '../../dialogs/dialogs.component';

@Component({
    selector: 'app-sound-card',
    templateUrl: './sound-card.component.html',
    styleUrls: ['./sound-card.component.css'],
    providers: [],
    host: { '[class]': "'w-full md:w-1/2'" }
})
export class SoundCardComponent implements OnInit, OnDestroy {
    active: boolean = false;
    volume: number = 1;
    volumeSubscription?: Subscription;

    @Input() audioData: Sound = {
        id: '',
        title: 'No sound',
        categoryID: '',
        icon: 'fa-solid fa-compact-disc',
        src: '',
    }

    constructor(private audioService: AudioService, private auth: AuthService,
        private backend: BackendService, private dialog: MatDialog,
        private snackbar: MatSnackBar) {
    }

    ngOnDestroy(): void {
        this.volumeSubscription?.unsubscribe();
    }

    ngOnInit(): void {
        this.volumeSubscription = this.audioService.get(this.audioData.id)?.volume.subscribe(vol => {
            this.volume = vol;
        })
    }

    onSliderChange(e: MatSliderChange) {
        if (this.volume == e.value) return;

        if (e.value != null) this.volume = e.value;
        this.audioService.get(this.audioData.id)?.volume.next(this.volume);
    }

    formatSlider(val: number) {
        return (val * 100).toFixed(0);
    }

    toggle() {
        if (this.isActive) {
            this.audioService.get(this.audioData.id)?.stop()
        }
        else {
            this.audioService.get(this.audioData.id)?.play();
        }
    }

    get isActive(): boolean {
        return this.audioService.isPlaying(this.audioData.id)
    }

    get isAdmin() {
        return this.auth.isAdmin;
    }

    getVolume(): number | null | undefined {
        return this.volume;
    }

    editSoundCard() {
        const dialogRef = this.dialog.open(SoundEditDialog, {
            data: { ...this.audioData }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.backend.updateSound(this.audioData.id, result).then(() => { // TODO: sus
                    this.snackbar.open(`Sound edited! 🎉`, '', {
                        duration: 2000,
                    });
                })
                    .catch(err => {
                        this.snackbar.open(`Failed to edit: ${err}`, '', {
                            duration: 2000,
                        });
                    }
                    );
            }
        });
    }

    deleteSoundCard() {
        const dialogRef = this.dialog.open(ConfirmDeleteDialog);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.backend.deleteSound(this.audioData.id)
                    .then(() => {
                        this.snackbar.open(`Sound removed`, '', {
                            duration: 2000,
                        });
                    })
                    .catch(err => {
                        this.snackbar.open(`Failed to remove: ${err}`, '', {
                            duration: 2000,
                        });
                    });
            }
        }
        );
    }
}
