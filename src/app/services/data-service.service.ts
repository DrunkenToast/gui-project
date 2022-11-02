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
        categories: new Map<string, boolean>(), // id:state
        currentlyPlaying: false,
    }

    soundsSubscription?: Subscription;
    categoriesSubscription?: Subscription;
    presetSubscription?: Subscription;

    constructor(private backend: BackendService, private auth: AuthService,
        private audioService: AudioService) {

        this.auth.user.subscribe(u => {
            if (this.soundsSubscription) this.soundsSubscription.unsubscribe();
            if (this.categoriesSubscription) this.categoriesSubscription.unsubscribe();
            if (this.presetSubscription) this.presetSubscription.unsubscribe();

            if (u) { // logged in
                this.onGetSounds();
                this.onGetCategories()
                this.onGetPresets(u.uid)
            }
            else { // logged out, clear out everything
                this.audioService.updateAudioPlayers([], this.sounds);
                this.sounds = [];
                this.categories = [];
                this.presets = [];
            }
        })
    }
    onGetSounds() {
        this.soundsSubscription = this.backend.getSounds().subscribe(sounds => {
            const deleted = this.sounds.filter(s => {
                return !sounds.some(ns => ns.id == s.id)
            });
            this.sounds = sounds;

            this.audioService.updateAudioPlayers(this.sounds, deleted);
        });
    }

    onGetPresets(uid: string) {
        this.presetSubscription = this.backend.getPresets(uid)
            .subscribe(presets => {
                this.presets = presets;
            })
    }

    onGetCategories() {
        this.categoriesSubscription = this.backend.getCategories().subscribe(categories => {
            this.categories = categories;

            for (let cat of categories) {
                if (!this.filters.categories.has(cat.id)) {
                    this.filters.categories.set(cat.id, true)
                }
            }

            for (let catID of this.filters.categories.keys()) {
                if (!categories.map(c => c.id).includes(catID)) {
                    this.filters.categories.delete(catID);
                }
            }
        })
    }
}
