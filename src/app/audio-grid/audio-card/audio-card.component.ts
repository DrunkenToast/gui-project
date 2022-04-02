import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { AudioData } from 'src/app/audio-data';
import { AudioService, AudioStates } from 'src/app/services/AudioService';

@Component({
  selector: 'app-audio-card',
  templateUrl: './audio-card.component.html',
  styleUrls: ['./audio-card.component.css'],
  providers: [],
  host: {'[class]': "'w-full lg:w-1/2'"}
})
export class AudioCardComponent implements OnInit {
  active: boolean = false;
  volume: number|null|undefined;

  @Input() audioData: AudioData = {
    id: 1,
    title: 'No sound',
    loop: true,
    categoryID: 1,
    icon: 'fa-solid fa-compact-disc',
    src: '',
  }

  constructor(private audioService: AudioService) {
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
    return this.audioService.get(this.audioData.id)?.getStatus() == AudioStates.playing
  }
}
