import { Component, OnInit } from '@angular/core';
import { AudioService } from '../services/audio-service.service';
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public audioService: AudioService, private data: DataService) { }

  ngOnInit(): void {
  }

  onPlayPauseClick() {
    if (this.audioService.isPlaying()) {
      console.log('Stopping...');
      this.audioService.autoStop()
    }
    else {
      console.log('Playing...');
      this.audioService.autoResume()
    }
  }
}
