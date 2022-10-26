import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { BackendService } from '../backend.service';
import { Category } from '../models/category-data';
import { PlayerState, Preset } from '../models/preset-data';
import { Sound, NewSound } from '../models/sound-data';
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
        categories: [] as boolean[], // TODO: fix category filters
        currentlyPlaying: false,
    }

    soundsSubscription?: Subscription;
    categoriesSubscription?: Subscription;
    presetSubscription?: Subscription;

    constructor(private backend: BackendService, private auth: AuthService,
        audioService: AudioService) {
        this.soundsSubscription = this.backend.getSounds().subscribe(sounds => {
            // TODO: sort on query
            this.sounds = sounds.sort((a, b) => a.title.localeCompare(b.title));
            audioService.updateAudioPlayers(this.sounds);
            console.log('yes!')
        });

        this.categoriesSubscription = this.backend.getCategories().subscribe(categories => {
            this.categories = categories;

            // TODO: filter categories
            // categories.forEach(category => {
            //     this.filters.categories[category.id] = true;
            // });
        })
 
        this.auth.user.subscribe(u => {
            if (this.presetSubscription) this.presetSubscription.unsubscribe();

            if (u) {
                this.presetSubscription = this.backend.getPresets(u.uid)
                    .subscribe(presets => {
                        this.presets = presets.sort((a, b) => a.name.localeCompare(b.name));
                    })
            }
        })
    }
}
