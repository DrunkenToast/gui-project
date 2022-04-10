import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category-data';
import { Preset } from '../models/preset-data';
import { Sound } from '../models/sound-data';
import { AudioService } from './audio-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  sounds: Sound[] = [];
  categories: Category[] = [];
  presets: Preset[] = [];

  filters = {
    categories: [] as boolean[],
    currentlyPlaying: false,
  }

  constructor(private http: HttpClient, private audioService: AudioService) {
    this.updateCategories();
    this.updateSounds();
    this.updatePresets();
  }

  updateSounds(): void {
    this.http.get<Sound[]>('http://localhost:3000/sounds').subscribe({
      next: (sounds: Sound[]) => {
        this.sounds = sounds;
        for (let sound of this.sounds) {
          // Might cause issues later when one new sound gets added

          let audio = this.audioService.get(sound.id)
          if (!audio) {
            this.audioService.set(sound.id)
            audio = this.audioService.get(sound.id)
            audio?.setSource(sound.src);
            audio?.setLoop(sound.loop);
          }
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });;
  }

  updateCategories(): void {
    this.http.get<Category[]>('http://localhost:3000/categories').subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: (err: any) => {
        console.log(err);
      }
    });;
  }

  updatePresets(): void {
    this.http.get<Preset[]>('http://localhost:3000/presets').subscribe({
      next: (presets: Preset[]) => {
        this.presets = presets;
      },
      error: (err: any) => {
        console.log(err);
      }
    });;
  }
}
