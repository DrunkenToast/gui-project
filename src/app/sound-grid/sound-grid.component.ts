import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../models/category-data';
import { Sound } from '../models/sound-data';
import { AudioService } from '../services/audio-service.service';
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-sound-grid',
  templateUrl: './sound-grid.component.html',
  styleUrls: ['./sound-grid.component.css'],
  host: {'[class]': "'bg-slate-500 rounded-lg m-2 overflow-auto h-full'"}
})
export class SoundGridComponent implements OnInit {
  @Input() categoryFilter: any;

  sounds: Sound[] = []
  categories: Category[] = [];

  constructor(private audioService: AudioService, private data: DataService) {
    this.OnGetSounds()
  }


  ngOnInit(): void {
    this.OnGetCategories()
    this.OnGetSounds()
  }

  OnGetSounds() {
    this.data.getSounds().subscribe({
      next: (sounds: Sound[]) => {
        this.sounds = sounds;
        for (let sound of this.sounds) {
          // Might cause issues later when one new sound gets added
          this.audioService.set(sound.id);
          this.audioService.get(sound.id)?.setSource(sound.src);
          this.audioService.get(sound.id)?.setLoop(sound.loop);
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  OnGetCategories() {
    this.data.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

}
