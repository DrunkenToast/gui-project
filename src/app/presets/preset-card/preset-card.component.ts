import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Preset } from '../../models/preset-data';
import { AudioService } from '../../services/audio-service.service';
import { DataService } from '../../services/data-service.service';
import { PresetNameDialog } from '../presets.component';

@Component({
  selector: 'app-preset-card',
  templateUrl: './preset-card.component.html',
  styleUrls: ['./preset-card.component.css']
})
export class PresetCardComponent implements OnInit {

  @Input()
  presetData!: Preset; // TODO: check if ! is ok

  constructor(private audio: AudioService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  loadPreset() {
    let states = new Map();
    this.presetData.playerStates.forEach(state => {
      states.set(state.id, state.status);
    });
    this.audio.loadStates(states);
    console.log(states);
  }

  renamePreset() {
    const dialogRef = this.dialog.open(PresetNameDialog, {
      width: '250px',
      data: this.presetData.name
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.presetData.name = result;
      }
    });
  }
}
