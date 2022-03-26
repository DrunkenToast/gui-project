import { Component, OnInit } from '@angular/core';
import { AudioData } from '../audio-data';

@Component({
  selector: 'app-audio-grid',
  templateUrl: './audio-grid.component.html',
  styleUrls: ['./audio-grid.component.css'],
})
export class AudioGridComponent implements OnInit {

  constructor() { }

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

  filterByCategoryID(sounds: AudioData[], id: number): AudioData[] {
    const filtered = sounds.filter((s) => s.categoryID == id);
    console.log(sounds, filtered, id)
    return filtered;
  }

}
