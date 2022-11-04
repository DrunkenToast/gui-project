import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { PlayerState } from '../models/preset-data';
import { AudioStatus, Sound } from '../models/sound-data';

@Injectable({
    providedIn: 'root',
})

export class AudioService {
    private audioPlayers = new Map<string, AudioPlayer>();
    private currentStates: PlayerState[] = [];
    private previousStates: PlayerState[] = [];

    constructor(private snackbar: MatSnackBar) {
    }

    updateAudioPlayers(sounds: Sound[], deleted: Sound[]): void {
        for (let delSound of deleted) {
            this.remove(delSound.id);
        }

        for (let sound of sounds) {
            let audio = this.get(sound.id);
            if (!audio) {
                this.set(sound.id)
                audio = this.get(sound.id)
                audio?.setSource(sound.src);
            }
        }
    }

    /** initialises an audioplayer */
    set(id: string): void {
        this.audioPlayers.set(id, new AudioPlayer(this.snackbar));
        let player = this.audioPlayers.get(id)!;

        player.status.subscribe((status: AudioStatus) => {
            // this.currentStates.set(id, status);
            let state = this.currentStates.find(state => state.id == id);
            if (state) {
                state.status = status;
            }
            else {
                this.currentStates.push({ id: id, status: status, volume: player.volume.getValue() });
            }
        });

        player.volume.subscribe((val: number) => {
            let state = this.currentStates.find(state => state.id == id);
            if (state) {
                state.volume = val;
            }
            else {
                this.currentStates.push({ id: id, status: player.status.getValue(), volume: val });
            }
        });
    }

    /** Grab audioplayer by id */
    get(id: string): AudioPlayer | undefined {
        return this.audioPlayers.get(id);
    }

    remove(id: string): boolean {
        this.audioPlayers.get(id)?.stop();
        return this.audioPlayers.delete(id);
    }

    /**Stops all audio players */
    autoStop(): void {
        this.saveCurrentStates();

        // stop all players
        this.audioPlayers.forEach(player => {
            player.stop();
        });
    }

    /**Resumes all audio players that were stopped with autoStop() */
    autoResume(): void {
        this.loadStates(this.previousStates);
    }

    /**Returns true if all players are stopped or one specified player is stopped
     * @param soundID Optional player id to check
     */
    isPlaying(soundID?: string): boolean {
        if (soundID) {
            let state = this.currentStates.find(state => state.id == soundID);
            return state?.status == 'playing';
        }
        else {
            let status = false
            this.currentStates.forEach((state) => {
                if (state.status == 'playing') {
                    status = true;
                }
            });
            return status;
        }
    }

    loadStates(states: PlayerState[]): void {
        this.saveCurrentStates();

        this.audioPlayers.forEach((player, id) => {
            let state = states.find(state => state.id == id);
            if (state) {
                state.status == 'playing' ? player.play() : player.stop();
                player.volume.next(state.volume);
            }
            else {
                player.stop();
            }
        });
    }

    /**Return copy of the current playerstates */
    exportStates(): PlayerState[] {
        return JSON.parse(JSON.stringify(this.currentStates));
    }

    private saveCurrentStates(): void {
        // deep copy current states
        this.previousStates = JSON.parse(JSON.stringify(this.currentStates));
    }

}

class AudioPlayer {
    private audio: HTMLAudioElement;
    public status: BehaviorSubject<AudioStatus>;
    public volume: BehaviorSubject<number>;

    constructor(private snackbar: MatSnackBar) {
        this.audio = new Audio();
        this.status = new BehaviorSubject<AudioStatus>('paused');
        this.volume = new BehaviorSubject(1);

        this.audio.addEventListener('playing', this.setStatus, false);
        this.audio.addEventListener('pause', this.setStatus, false);
        this.audio.addEventListener('waiting', this.setStatus, false);
        this.audio.addEventListener('ended', this.setStatus, false);

        this.audio.loop = true;

        this.volume.subscribe(vol => {
            this.audio.volume = vol;
        })
    }

    private setStatus = (ev: Event) => {
        switch (ev.type) {
            case 'playing':
                this.status.next('playing');
                break;
            case 'pause':
                this.status.next('paused');
                break;
            case 'waiting':
                this.status.next('waiting');
                break;
            case 'ended':
                this.status.next('ended');
                break;
            default:
                this.status.next('paused');
                break;
        }
    }

    play() {
        this.audio.play()
            .catch(_err => {
                this.snackbar.open(`Failed to play audio`, '', {
                    duration: 1000,
                });
            });
        this.status.next('playing');
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.status.next('paused');
    }

    setSource(src: string) {
        this.audio.src = src
        this.audio.load();
    }
}
