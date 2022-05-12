import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category-data';
import { PlayerState, Preset } from '../models/preset-data';
import { Sound, SoundCreate } from '../models/sound-data';
import { AudioService } from './audio-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  sounds: Sound[] = [];
  categories: Category[] = [];
  presets: Preset[] = [];

  filters = {
    soundKeyword: '',
    categories: [] as boolean[],
    currentlyPlaying: false,
  }

  constructor(private http: HttpClient, private audioService: AudioService) {
    this.updateCategories();
    this.updateSounds();
    this.updatePresets();
  }

  updateSounds(): void {
    this.http.get<Sound[]>(environment.api_url + '/sounds').subscribe({
      next: (sounds: Sound[]) => {
        this.sounds = sounds.sort((a, b) => a.title.localeCompare(b.title));
        for (let sound of this.sounds) {
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

  editSound(sound: Sound): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.put<Sound>(environment.api_url + '/sounds/' + sound.id, sound).subscribe({
        next: (sound: Sound) => {
          this.updateSounds();
          resolve();
        },
        error: (err: any) => {
          reject(err);
        }
      });
    });
  }

  createSound(sound: SoundCreate): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<Sound>(environment.api_url + '/sounds', sound).subscribe({
        next: (sound: Sound) => {
          this.updateSounds();
          resolve();
        },
        error: (err: any) => {
          reject(err);
        }
      });
    });
  }

  deleteSound(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.delete<void>(environment.api_url + '/sounds/' + id).subscribe({
        next: () => {
          this.updateSounds();
          resolve();
        },
        error: (err: any) => {
          reject(err);
        }
      });
    });
  }

  updateCategories(): void {
    this.http.get<Category[]>(environment.api_url + '/categories').subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;

        categories.forEach(category => {
          this.filters.categories[category.id] = true;
        });
      },
      error: (err: any) => {
        console.log(err);
      }
    });;
  }

  updatePresets(): void {
    this.http.get<Preset[]>(environment.api_url + '/presets').subscribe({
      next: (presets: Preset[]) => {
        this.presets = presets.sort((a, b) => a.name.localeCompare(b.name));
        console.log(this.presets);
      },
      error: (err: any) => {
        console.log(err);
      }
    });;
  }

  editPreset(preset: Preset): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.put<Preset>(environment.api_url + '/presets/' + preset.id, preset).subscribe({
        next: (preset: Preset) => {
          this.updatePresets();
          resolve();
        },
        error: (err: any) => {
          reject(err);
        }
      });
    });
  }

  createPreset(name: string, playerStates: PlayerState[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<Preset>(environment.api_url + '/presets', {
        name: name,
        playerStates: playerStates
      }).subscribe({
        next: (preset: Preset) => {
          this.updatePresets();
          resolve();
        },
        error: (err: any) => {
          reject(err);
        }
      });
    });
  }

  editPresetStates(preset: Preset, playerStates: PlayerState[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.put<Preset>(environment.api_url + '/presets/' + preset.id, {
        name: preset.name,
        playerStates: playerStates
      }).subscribe({
        next: (preset: Preset) => {
          this.updatePresets();
          resolve();
        },
        error: (err: any) => {
          reject(err);
        }
      });
    });
  }

  deletePreset(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.delete<Preset>(environment.api_url + '/presets/' + id).subscribe({
        next: (preset: Preset) => {
          this.updatePresets();
          resolve();
        },
        error: (err: any) => {
          reject(err);
        }
      });
    });
  }
}
