import { AudioStatus } from "./sound-data";

export interface PresetCreate {
  name: string,
  playerStates: PlayerState[]
}

export interface Preset extends PresetCreate {
  id: number,
}

export interface PlayerState {
  id: number,
  status: AudioStatus,
  volume: number,
}
