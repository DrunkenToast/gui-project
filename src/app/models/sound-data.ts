/*
Describes the data for an audio component. This does not include data such as volume or it's status, that's loaded seperately for presets.
It does include data such as loop and interval because it describes how that audio component should function.
*/

export interface Sound {
  id: number,
  title: string,
  icon: string,
  categoryID: number,
  src: string,
  loop: boolean,
  interval?: {
    min: number,
    max: number
  }
}
