import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AudioService {
  private audioPlayers = new Map<Number, AudioPlayer>();
  private currentStates = new Map<Number, AudioStatus>();
  private previousStates = new Map<Number, AudioStatus>();
  private globalStatus: AudioStatus.paused | AudioStatus.playing = AudioStatus.paused;

  constructor() {
  }

  /** initialises an audioplayer */
  set(id: number): void {
    this.audioPlayers.set(id, new AudioPlayer());

    this.audioPlayers.get(id)?.statusChange.subscribe((status: AudioStatus) => {
      this.currentStates.set(id, status);

      if (status == AudioStatus.playing) {
        this.globalStatus = AudioStatus.playing;
      }
    });
  }

  /** Grab audioplayer by id */
  get(id: number): AudioPlayer | undefined {
    return this.audioPlayers.get(id);
  }

  /**Stops all audio players */
  autoStop() {
    console.log(this.previousStates, this.currentStates)
    this.previousStates = new Map(this.currentStates);
    console.log(this.previousStates, this.currentStates)
    this.audioPlayers.forEach(player => {
      player.stop();
    });
    this.globalStatus = AudioStatus.paused;
  }

  /**Resumes all audio players that were stopped with autoStop() */
  autoResume() {
    this.loadStates(this.previousStates);
  }

  isPlaying() {
    return this.globalStatus == AudioStatus.playing;
  }

  getCurrentStates() {return this.currentStates}

  loadStates(states: Map<Number, AudioStatus>) {
    for (let [id, state] of states) {
      console.debug(id, state);
      if (state == AudioStatus.playing)
        this.audioPlayers.get(id)?.play()
    }
    this.globalStatus = AudioStatus.playing;
  }

}

class AudioPlayer {
  private audio: HTMLAudioElement;
  private status: AudioStatus = AudioStatus.paused;
  public statusChange = new EventEmitter();

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
          this.status = AudioStatus.playing;
          break;
      case 'pause':
          this.status = AudioStatus.paused;
          break;
      case 'waiting':
          this.status = AudioStatus.waiting;
          break;
      case 'ended':
          this.status = AudioStatus.ended;
          break;
      default:
          this.status = AudioStatus.paused;
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
    this.status = AudioStatus.playing;
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.status = AudioStatus.paused;
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

export enum AudioStatus {
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
