/*
Describes the data for an audio component. This does not include data such as volume or it's status, that's loaded seperately for presets.
It does include data such as loop and interval because it describes how that audio component should function.
*/

export interface AudioData {
  id: string,
  title: string,
  icon: string,
  categoryID: string,
  src: string,
  loop: boolean,
  interval?: {
    min: number,
    max: number
  }
}
