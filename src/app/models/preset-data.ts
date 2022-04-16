import { AudioStatus } from "./sound-data";

export interface Preset {
  id: number,
  name: string,
  playerStates: PlayerState[]
}

export interface PlayerState {
  id: number,
  status: AudioStatus,
  volume: number,
}
