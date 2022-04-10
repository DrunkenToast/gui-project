export interface Preset {
  id: number,
  name: string,
  playerStates: [
    {
      id: number,
      status: string,
    }
  ]
}
