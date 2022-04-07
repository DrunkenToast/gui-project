import { Pipe, PipeTransform } from '@angular/core';
import { Sound } from './models/sound-data';

@Pipe({
  name: 'filterSounds'
})
export class FilterSoundsPipe implements PipeTransform {

  transform(value: Sound[], ...args: unknown[]): Sound[] {
    return (value as Sound[]).filter((a) => a.categoryID === args[0]);
  }

}
