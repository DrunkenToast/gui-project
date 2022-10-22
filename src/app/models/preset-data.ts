import { AudioStatus } from "./sound-data";

export interface NewPreset {
  name: string,
  playerStates: PlayerState[]
}

export interface Preset extends NewPreset {
  id: string,
}

export interface PlayerState {
  id: string,
  status: AudioStatus,
  volume: number,
}
