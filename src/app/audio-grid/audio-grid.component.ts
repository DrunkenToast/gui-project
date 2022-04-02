import { Component, Input, OnInit } from '@angular/core';
import { AudioData } from '../audio-data';
import { AudioService } from '../services/AudioService';

@Component({
  selector: 'app-audio-grid',
  templateUrl: './audio-grid.component.html',
  styleUrls: ['./audio-grid.component.css'],
  host: {'[class]': "'bg-slate-500 rounded-lg m-2 overflow-auto'"}
})
export class AudioGridComponent implements OnInit {
  @Input() categoryFilter: any;

  constructor(private audioService: AudioService) {
    for (let sound of this.sounds) {
      this.audioService.set(sound.id);
      this.audioService.get(sound.id)?.setSource(sound.src);
      this.audioService.get(sound.id)?.setLoop(sound.loop);
    }
  }

  categories = [
    {
      id: 1,
      name: 'Nature'
    },
    {
      id: 2,
      name: 'City'
    }
  ]

  sounds = [
    {
      id: 1,
      title: 'Birds',
      loop: true,
      categoryID: 1,
      icon: 'fa-solid fa-dove',
      src: 'assets/sounds/birds.ogg',
    },
    {
      id: 2,
      title: 'Boat',
      loop: true,
      categoryID: 2,
      icon: 'fa-solid fa-anchor',
      src: 'assets/sounds/boat.ogg',
    },
    {
      id: 3,
      title: 'City',
      loop: true,
      categoryID: 2,
      icon: 'fa-solid fa-city',
      src: 'assets/sounds/city.ogg',
    },
    {
      id: 4,
      title: 'Coffee shop',
      loop: true,
      categoryID: 2,
      icon: 'fa-solid fa-mug-hot',
      src: 'assets/sounds/coffee-shop.ogg',
    },
  ]

  ngOnInit(): void {
  }

  filterCategories() {
    return this.categories.filter((c) => c.id == this.categoryFilter)
  }
}
