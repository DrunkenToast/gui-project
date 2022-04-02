import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',

})

export class AudioService {
  private audioPlayers = new Map<Number, AudioPlayer>();

  constructor() {
  }

  /** initialises an audioplayer */
  set(id: number): void {
    this.audioPlayers.set(id, new AudioPlayer());
  }

  /** Grab audioplayer by id */
  get(id: number): AudioPlayer | undefined {
    return this.audioPlayers.get(id);
  }
}

class AudioPlayer {
  private audio: HTMLAudioElement;
  private status: AudioStates = AudioStates.paused;

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
          this.status = AudioStates.playing;
          break;
      case 'pause':
          this.status = AudioStates.paused;
          break;
      case 'waiting':
          this.status = AudioStates.waiting;
          break;
      case 'ended':
          this.status = AudioStates.ended;
          break;
      default:
          this.status = AudioStates.paused;
          break;
    }
  }

  getStatus(): AudioStates {
    return this.status;
  }

  play() {
    console.log('playing', this.audio.volume);
    this.audio.play();
    this.status = AudioStates.playing;
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.status = AudioStates.paused;
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
  }

  getTime() {
    return this.audio.currentTime;
  }
}

export enum AudioStates {
  playing,
  paused,
  waiting,
  ended,
}


// export interface AudioIntervalData {
//   minDelay: number,
//   maxDelay: number,
//   minVolumeMod: number,
//   maxVolumeMod: number,
// }
