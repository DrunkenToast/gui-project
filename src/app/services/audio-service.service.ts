import { Injectable, EventEmitter } from '@angular/core';
import { PlayerState } from '../models/preset-data';
import { AudioStatus } from '../models/sound-data';

@Injectable({
  providedIn: 'root',
})

export class AudioService {
  private audioPlayers = new Map<number, AudioPlayer>();
  private currentStates: PlayerState[] = [];
  private previousStates: PlayerState[] = [];

  constructor() {
  }

  /** initialises an audioplayer */
  set(id: number): void {
    this.audioPlayers.set(id, new AudioPlayer());
    let player = this.audioPlayers.get(id)!;

    player.statusChange.subscribe((status: AudioStatus) => {
      // this.currentStates.set(id, status);
      let state = this.currentStates.find(state => state.id == id);
      if (state) {
        state.status = status;
      }
      else {
        this.currentStates.push({ id: id, status: status, volume: player.getVolume() });
      }
    });

    player.volumeChange.subscribe((val: number) => {
      let state = this.currentStates.find(state => state.id == id);
      if (state) {
        state.volume = val;
      }
      else {
        this.currentStates.push({ id: id, status: player.getStatus(), volume: val });
      }
    });
  }

  /** Grab audioplayer by id */
  get(id: number): AudioPlayer | undefined {
    return this.audioPlayers.get(id);
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

  isPlaying(soundID?: number): boolean {
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

    // Old code: this would cause a stutter.
    // this.autoStop();
    // states.forEach((state) => {
    //   if (state.status == 'playing') {
    //     this.audioPlayers.get(state.id)?.play();
    //     this.audioPlayers.get(state.id)?.setVolume(state.volume);
    //   }
    // });

    this.saveCurrentStates();

    this.audioPlayers.forEach((player, id) => {
      let state = states.find(state => state.id == id);
      if (state) {
        state.status == 'playing' ? player.play() : player.stop();
        player.setVolume(state.volume);
      }
      else {
        player.stop();
      }
    });
  }

  exportStates(): PlayerState[] {
    return this.currentStates.slice();
  }

  private saveCurrentStates(): void {
    // deep copy current states
    this.previousStates = JSON.parse(JSON.stringify(this.currentStates));
  }

}

class AudioPlayer {
  private audio: HTMLAudioElement;
  private status: AudioStatus = 'paused';
  public statusChange = new EventEmitter<AudioStatus>();
  public volumeChange = new EventEmitter<number>();

  constructor() {
    this.audio = new Audio();

    this.audio.addEventListener('playing', this.setStatus, false);
    this.audio.addEventListener('pause', this.setStatus, false);
    this.audio.addEventListener('waiting', this.setStatus, false);
    this.audio.addEventListener('ended', this.setStatus, false);
  }

  private setStatus = (ev: Event) => {
    switch (ev.type) {
      case 'playing':
          this.status = 'playing';
          break;
      case 'pause':
          this.status = 'paused';
          break;
      case 'waiting':
          this.status = 'waiting';
          break;
      case 'ended':
          this.status = 'ended';
          break;
      default:
          this.status = 'paused';
          break;
    }
    this.statusChange.emit(this.status);
  }

  getStatus(): AudioStatus {
    return this.status;
  }

  play() {
    console.log('playing', this.audio.volume);
    this.audio.play();
    this.status = 'playing';
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.status = 'paused';
  }

  setSource(src: string) {
    this.audio.src = src
    this.audio.load();
  }

  setLoop(loop: boolean) {
    this.audio.loop = loop;
  }

  setVolume(volume: number) {
    this.audio.volume = volume;
    this.volumeChange.emit(volume);
  }

  getVolume() {
    return this.audio.volume;
  }

  getTime() {
    return this.audio.currentTime;
  }
}

// export enum AudioStatus {
//   playing = "playing",
//   paused = "paused",
//   waiting = "waiting",
//   ended = "ended",
// }


// export interface AudioIntervalData {
//   minDelay: number,
//   maxDelay: number,
//   minVolumeMod: number,
//   maxVolumeMod: number,
// }
