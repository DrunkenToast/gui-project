import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sound } from 'src/app/models/sound-data';
import { AudioService } from 'src/app/services/audio-service.service';
import { DataService } from 'src/app/services/data-service.service';
import { ConfirmDeleteDialog, SoundEditDialog } from '../../dialogs/dialogs.component';

@Component({
  selector: 'app-sound-card',
  templateUrl: './sound-card.component.html',
  styleUrls: ['./sound-card.component.css'],
  providers: [],
  host: {'[class]': "'w-full lg:w-1/2'"}
})
export class SoundCardComponent implements OnInit {
  active: boolean = false;
  volume: number|null|undefined;

  @Input() audioData: Sound = {
    id: 1,
    title: 'No sound',
    loop: true,
    categoryID: 1,
    icon: 'fa-solid fa-compact-disc',
    src: '',
  }

  constructor(private audioService: AudioService, private dialog: MatDialog, private data: DataService, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onSliderChange(e: MatSliderChange) {
    this.volume = e.value;
    if (this.volume != null)
      this.audioService.get(this.audioData.id)?.setVolume(this.volume);
  }

  formatSlider(val: number) {
    return (val * 100).toFixed(0);
  }

  toggle() {
    if (this.isActive()) {
      this.audioService.get(this.audioData.id)?.stop()
    }
    else {
      this.audioService.get(this.audioData.id)?.play();
    }
  }

  isActive() {
    return this.audioService.isPlaying(this.audioData.id)
  }

  getVolume() {
    return this.audioService.get(this.audioData.id)?.getVolume();
  }

  editSoundCard() {
    const dialogRef = this.dialog.open(SoundEditDialog, {
      data: {...this.audioData}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.audioData = result;
        this.data.editSound(result).then(() => {
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
        this.data.deleteSound(this.audioData.id)
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
