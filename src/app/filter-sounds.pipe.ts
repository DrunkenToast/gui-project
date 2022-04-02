import { Pipe, PipeTransform } from '@angular/core';
import { AudioData } from './audio-data';

@Pipe({
  name: 'filterSounds'
})
export class FilterSoundsPipe implements PipeTransform {

  transform(value: AudioData[], ...args: unknown[]): AudioData[] {
    return value.filter((a) => a.categoryID === args[0]);
  }

}
