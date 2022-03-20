// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',

// })


export class AudioService {
  private audio: HTMLAudioElement;
  private status?: AudioStates = AudioStates.paused;

  constructor() {
    this.audio = new Audio();
  }

  play() {
    //catch errors
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
    console.log('Changed source:', src, this.audio.src, this.audio);
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

  // private attachEventHandlers(): void {
  //   this.audio.addEventListener('playing', this.setAudioStatus, false);
  //   this.audio.addEventListener('pause', this.setAudioStatus, false);
  //   this.audio.addEventListener('waiting', this.setAudioStatus, false);
  //   this.audio.addEventListener('ended', this.setAudioStatus, false);
  // }

  // private setAudioStatus = (e: Event) => {
  //   switch (e.type) {
  //     case 'playing':
  //       this.status = AudioStates.playing;
  //       break;
  //     case 'pause':
  //       this.status = AudioStates.paused;
  //       break;
  //     case 'waiting':
  //       this.status = AudioStates.waiting;
  //       break;
  //     case 'ended':
  //       this.status = AudioStates.ended;
  //       break;
  //   }
  // }
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
