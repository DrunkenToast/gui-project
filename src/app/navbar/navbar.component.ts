import { Component, OnInit } from '@angular/core';
import { AudioService } from '../services/audio-service.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(public audioService: AudioService) { }

    ngOnInit(): void {
    }

    onPlayPauseClick() {
        if (this.audioService.isPlaying()) {
            this.audioService.autoStop()
        }
        else {
            this.audioService.autoResume()
        }
    }

}
