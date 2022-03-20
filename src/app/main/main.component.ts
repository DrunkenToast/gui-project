import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  sounds = [
    {
      id: '1',
      title: 'Birds',
      loop: true,
      categoryID: '1',
      icon: 'fa-solid fa-dove',
      src: 'assets/sounds/birds.ogg',
    },
    {
      id: '2',
      title: 'Boat',
      loop: true,
      categoryID: '1',
      icon: 'fa-solid fa-anchor',
      src: 'assets/sounds/boat.ogg',
    },
    {
      id: '3',
      title: 'City',
      loop: true,
      categoryID: '1',
      icon: 'fa-solid fa-city',
      src: 'assets/sounds/city.ogg',
    },
    {
      id: '1',
      title: 'Coffee shop',
      loop: true,
      categoryID: '1',
      icon: 'fa-solid fa-mug-hot',
      src: 'assets/sounds/city.ogg',
    },
  ]

  ngOnInit(): void {
  }

}
