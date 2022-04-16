import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Sound } from 'src/app/models/sound-data';
import { AudioService } from 'src/app/services/audio-service.service';

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
    return this.audioService.isPlaying(this.audioData.id)
  }

  getVolume() {
    return this.audioService.get(this.audioData.id)?.getVolume();
  }
}
