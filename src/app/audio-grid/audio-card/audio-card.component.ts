import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { AudioData } from 'src/app/audio-data';
import { AudioService } from 'src/app/services/AudioService';

@Component({
  selector: 'app-audio-card',
  templateUrl: './audio-card.component.html',
  styleUrls: ['./audio-card.component.css'],
  providers: [AudioService],
  host: {'[class]': "'w-full lg:w-1/2'"}
})
export class AudioCardComponent implements OnInit {
  active: boolean = false;
  volume: number|null|undefined;
  audio = new AudioService();
  @Input() audioData: AudioData = {
    id: 1,
    title: 'No sound',
    loop: true,
    categoryID: 1,
    icon: 'fa-solid fa-compact-disc',
    src: '',
  }

  constructor() {
  }

  ngOnInit(): void {
    this.importData(this.audioData);
  }

  importData(data: AudioData) {
    console.log('changes', data.src)
    this.audio.setSource(data.src);
    this.audio.setLoop(data.loop);
    console.log(this.audio)
  }

  //TODO: Fix static?
  onSliderChange(e: MatSliderChange) {
    // console.log(e.value);
    this.volume = e.value;
    if (this.volume != null)
      this.audio.setVolume(this.volume)
  }

  formatSlider(val: number) {
    return (val * 100).toFixed(0);
  }

  toggle() {
    console.log('toggle', this.audio)
    if (this.active) {
      this.audio.stop()
    }
    else {
      this.audio.play();
    }
    this.active = !this.active;
  }
}
