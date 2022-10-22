import { Component, Inject, Input, OnInit } from '@angular/core';
import { AudioService } from '../services/audio-service.service';
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-sound-grid',
  templateUrl: './sound-grid.component.html',
  styleUrls: ['./sound-grid.component.css'],
})
export class SoundGridComponent implements OnInit {
  @Input() categoryFilter: any;

  constructor(public data: DataService, public audioService: AudioService) {
  }

  ngOnInit(): void {

  }

  filterIsPlaying(soundID: string): boolean {
    if (this.data.filters.currentlyPlaying) {
      return this.audioService.isPlaying(soundID);
    }
    else {
      return true;
    }
  }
}

